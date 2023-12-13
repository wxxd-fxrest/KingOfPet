import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostFeedScreen from '../profile/PostFeedScreen';
import DiaryFeedScreen from '../profile/DiaryFeedScreen';
import AllLikeFeedScreen from '../profile/AllLikeFeedScreen';

const Tab = createMaterialTopTabNavigator();

const UserProfileScreen = ({ navigation, route: params }) => {
    const [currentUser, setCurrentUser] = useState([]);
    const [userData, setUserData] = useState([]);
    const [hide, setHide] = useState(true);

    let userdata = params.params;
    console.log('params', params);

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // 여기에 스크롤 감지 시 실행할 코드를 작성합니다.
        // console.log('Scroll OffsetY:', offsetY);

        if (offsetY > 0) {
            setHide(false);
        } else if (offsetY < 0) {
            setHide(true);
        }
    };

    // useEffect(() => {
    //     setCurrentUser(auth().currentUser);
    //     // console.log('profile', currentUser);
    //     firestore()
    //         .collection('Users')
    //         .doc(`${currentUser.email}`)
    //         .onSnapshot((documentSnapshot) => {
    //             setUserData(documentSnapshot.data());
    //             console.log('profile User data: ', documentSnapshot.data());
    //         });
    // }, [currentUser]);

    useEffect(() => {
        if (userData) {
            navigation.setOptions({
                headerTitle: () => <UserID>{userdata.username}</UserID>,
            });
        }
    }, [navigation, userData]);

    return (
        <Container>
            {hide === true && (
                <>
                    {userdata && (
                        <ProfileBox>
                            <ProfilePetImgBox>
                                <ProfilePetImg source={{ uri: userdata.image }} />
                            </ProfilePetImgBox>
                            <ProfilePetNameBox>
                                <ProfilePetNameTitle>상전</ProfilePetNameTitle>
                                <ProfilePetName>
                                    {params.params.username}
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
                            <FollowBox>
                                <Follow>Follow</Follow>
                            </FollowBox>
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
                    // component={PostFeedScreen}
                    children={() => <PostFeedScreen navigation={navigation} handleScroll={handleScroll} />}
                    options={{
                        title: '게시글',
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name="Diary"
                    // component={DiaryFeedScreen}
                    children={() => <DiaryFeedScreen navigation={navigation} handleScroll={handleScroll} />}
                    options={{
                        title: '일기',
                    }}
                />
                <Tab.Screen
                    name="Like"
                    // component={AllLikeFeedScreen}
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

const FollowBox = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    background-color: rgba(193, 204, 200, 0.2);
    padding: 8px 12px;
    border-radius: 16px;
    border-width: 1px;
    border-color: #243e35;
`;

const Follow = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: #243e35;
`;

const UserID = styled.Text`
    color: #243e35;
    font-size: 18px;
    font-weight: 600;
`;

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default UserProfileScreen;
