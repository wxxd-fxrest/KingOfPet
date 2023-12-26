import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import AllLikeFeedScreen from '../feed/profile/AllLikeFeedScreen';
import { MaterialIcons } from '@expo/vector-icons';
import UserPostFeedScreen from '../feed/userprofile/UserPostFeedScreen';
import UserDiaryFeedScreen from '../feed/userprofile/UserDiaryFeedScreen';
import FollowButton from '../../components/FollowButton';
import EmptyImg from '../../assets/logo.png';

const Tab = createMaterialTopTabNavigator();

const UserProfileScreen = ({ navigation, route: params }) => {
    // const navigation = useNavigation();
    const [hide, setHide] = useState(true);
    const [postData, setPostData] = useState([]);
    const [follow, setFollow] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentUserData, setCurrentUserData] = useState([]);

    let userData = params?.params;
    console.log('params', params?.params);
    console.log('유저 params', userData);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        // console.log('profile', currentUser);

        firestore()
            .collection('Users')
            .doc(`${currentUser.email}`)
            .onSnapshot((documentSnapshot) => {
                setCurrentUserData(documentSnapshot.data());
                console.log('디테일 페이지 current 유저 데이터: ', documentSnapshot.data());
            });
    }, [currentUser]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Posts')
            .orderBy('orderBy', 'desc')
            .onSnapshot((documentSnapshot) => {
                let feedArray = [];
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id,
                        Data: doc.data(),
                    });
                });
                setPostData(feedArray);
            });

        return () => subscriber();
    }, []);

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // console.log('Scroll OffsetY:', offsetY);

        if (offsetY > 0) {
            setHide(false);
        } else if (offsetY < 0) {
            setHide(true);
        }
    };

    useEffect(() => {
        if (userData) {
            navigation.setOptions({
                headerTitle: () => <UserID>{userData.userid}</UserID>,
                headerLeft: () =>
                    Platform.OS === 'ios' ? (
                        <BackButton onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                        </BackButton>
                    ) : null,
            });
        }
    }, [navigation]);

    return (
        <Container>
            {hide === true && (
                <>
                    {userData && (
                        <ProfileBox>
                            <ProfilePetImgBox>
                                <ProfilePetImg source={{ uri: userData.petimage } || EmptyImg} />
                            </ProfilePetImgBox>
                            <ProfilePetNameBox>
                                <ProfilePetNameTitle>상전</ProfilePetNameTitle>
                                <ProfilePetName>
                                    {userData.petname}
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 400,
                                            color: '#343c3a',
                                        }}
                                    >
                                        님
                                    </Text>
                                </ProfilePetName>
                            </ProfilePetNameBox>
                            <FollowButton
                                setFollow={setFollow}
                                follow={follow}
                                currentUserData={currentUserData}
                                userData={userData}
                            />
                        </ProfileBox>
                    )}
                </>
            )}
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
                    name="Post"
                    children={() => (
                        <UserPostFeedScreen
                            navigation={navigation}
                            handleScroll={handleScroll}
                            userData={userData}
                            postData={postData}
                        />
                    )}
                    options={{
                        title: '게시글',
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name="Diary"
                    children={() => (
                        <UserDiaryFeedScreen navigation={navigation} handleScroll={handleScroll} userData={userData} />
                    )}
                    options={{
                        title: '일기',
                    }}
                />
                <Tab.Screen
                    name="Like"
                    children={() => <AllLikeFeedScreen navigation={navigation} handleScroll={handleScroll} />}
                    options={{
                        title: '도장',
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
    padding-bottom: 30px;
`;

const ProfileBox = styled.View`
    padding: 20px;
    flex-direction: row;
    align-items: center;
`;

const ProfilePetImgBox = styled.View``;

const ProfilePetImg = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 12px;
    margin-right: 20px;
`;

const ProfilePetNameBox = styled.View``;

const ProfilePetNameTitle = styled.Text`
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #343c3a;
`;

const ProfilePetName = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #343c3a;
`;

const UserID = styled.Text`
    color: #243e35;
    font-size: 18px;
    font-weight: 600;
`;

const BackButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default UserProfileScreen;
