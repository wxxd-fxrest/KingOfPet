import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RandomFeedScreen from '../feed/main/RandomFeedScreen';
import QuestionFeedScreen from '../feed/main/QuestionFeedScreen';
import FollowFeedScreen from '../feed/main/FollowFeedScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const MainScreen = ({ handleScroll, hide, postData }) => {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState([]);
    const [loginUserData, setLoginUserData] = useState([]);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        console.log('main', currentUser);
    }, [currentUser]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const subscriber = firestore()
                .collection('Users')
                .doc(`${currentUser.email}`)
                .onSnapshot((documentSnapshot) => {
                    const userData = documentSnapshot.data();
                    setLoginUserData(userData);
                    // console.log('User data: ', userData);

                    if (userData.createprofile === false) {
                        Alert.alert('프로필이 미완성 상태입니다.', '프로필 수정을 통해 프로필을 완성해 주세요!', [
                            {
                                text: 'Yes',
                                onPress: () => navigation.navigate('MainStack', { screen: 'SocialLoginScreen' }),
                            },
                        ]);
                    }
                });

            return () => {
                clearTimeout(timeoutId);
                subscriber();
            };
        }, 2000); // 2초 후에 실행

        return () => clearTimeout(timeoutId);
    }, [currentUser]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <MaterialIcons name="pets" size={24} color="#243e35" />,
            headerRight: () => (
                <View
                    style={{
                        width: '40%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: 20,
                    }}
                >
                    <SetupButton>
                        <Feather
                            name="search"
                            size={28}
                            color="#243e35"
                            onPress={() => navigation.navigate('MainStack', { screen: 'Search' })}
                        />
                    </SetupButton>
                    <SetupButton>
                        <Feather
                            name="plus-circle"
                            size={28}
                            color="#243e35"
                            onPress={() => navigation.navigate('MainStack', { screen: 'NewPostStack' })}
                        />
                    </SetupButton>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <Container hide={hide}>
            <Tab.Navigator
                initialRouteName="All"
                screenOptions={{
                    tabBarActiveTintColor: '#243e35',
                    tabBarInactiveTintColor: 'rgba(36, 62, 53, 0.5)',
                    tabBarStyle: {
                        backgroundColor: '#f9f9f7',
                    },
                    tabBarLabelStyle: {
                        textAlign: 'center',
                        fontSize: 15,
                    },
                    tabBarIndicatorStyle: {
                        borderBottomColor: '#243e35',
                        borderBottomWidth: 2.5,
                        width: 70,
                        left: 35,
                    },
                }}
            >
                <Tab.Screen
                    name="All"
                    children={() => (
                        <RandomFeedScreen navigation={navigation} handleScroll={handleScroll} postData={postData} />
                    )}
                    options={{
                        title: '전체',
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name="Follow"
                    component={FollowFeedScreen}
                    options={{
                        title: '구독',
                    }}
                />
                <Tab.Screen
                    name="QnA"
                    children={() => (
                        <QuestionFeedScreen navigation={navigation} handleScroll={handleScroll} postData={postData} />
                    )}
                    options={{
                        title: '질문',
                        unmountOnBlur: true,
                    }}
                />
            </Tab.Navigator>
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
    padding-top: ${({ hide }) => (hide ? '0' : '14%')};
`;

const SetupButton = styled.View``;

export default MainScreen;
