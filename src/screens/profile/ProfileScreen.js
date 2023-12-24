import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Alert, Text, View } from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import PostFeedScreen from '../feed/profile/PostFeedScreen';
import DiaryFeedScreen from '../diary/DiaryFeedScreen';
import AllLikeFeedScreen from '../feed/profile/AllLikeFeedScreen';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import EmptyImg from '../../assets/logo.png';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({ postData }) => {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState([]);
    const [currentUserData, setCurrentUserData] = useState([]);

    const [hide, setHide] = useState(true);

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
        setCurrentUser(auth().currentUser);
        // console.log('profile', currentUser);
        firestore()
            .collection('Users')
            .doc(`${currentUser.email}`)
            .onSnapshot((documentSnapshot) => {
                setCurrentUserData(documentSnapshot.data());
                console.log('profile User data: ', documentSnapshot.data());
            });
    }, [currentUser]);

    useEffect(() => {
        if (currentUserData) {
            navigation.setOptions({
                headerTitle: () => <UserID>{currentUserData.userid}</UserID>,
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
                            <MaterialCommunityIcons
                                name="star-circle-outline"
                                size={30}
                                color="#243e35"
                                onPress={() => navigation.navigate('MainStack', { screen: 'ImportantDiary' })}
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

                headerLeft: () => (
                    <SettingButton>
                        <MaterialIcons
                            name="logout"
                            size={28}
                            color="#243e35"
                            style={{ transform: [{ rotateY: '180deg' }] }}
                            onPress={onLogOut}
                        />
                    </SettingButton>
                ),
            });
        }
    }, [navigation, currentUserData]);

    const onLogOut = () => {
        Alert.alert(
            'Log Out',
            '정말로 로그아웃하시겠습니까?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('no'),
                    style: 'destructive',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        if (currentUserData.signType === 'Google' || currentUserData.signType === 'Email') {
                            auth().signOut();
                            console.log('firebase logout message');
                        } else if (currentUserData.signType === 'KaKao') {
                            const message = await KakaoLogin.logout();
                            console.log('kakao logout message', message);
                            auth().signOut();
                            console.log('firebase logout message');
                        }
                    },
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return (
        <Container>
            {hide === true && (
                <>
                    {currentUserData && (
                        <ProfileBox>
                            <ProfilePetImgBox>
                                <ProfilePetImg source={{ uri: currentUserData.petimage || EmptyImg }} />
                                <ImageEditBtn
                                    onPress={() => navigation.navigate('MainStack', { screen: 'EditProfile' })}
                                >
                                    <AntDesign name="pluscircle" size={20} color="#243e35" />
                                </ImageEditBtn>
                            </ProfilePetImgBox>
                            <ProfileRightBox>
                                <ProfilePetNameBox>
                                    <ProfilePetNameTitle>상전</ProfilePetNameTitle>
                                    <ProfilePetName>
                                        {currentUserData.petname}
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
                                <FollowContainer>
                                    <FollowBox onPress={() => navigation.navigate('MainStack', { screen: 'Follower' })}>
                                        {currentUserData && currentUserData.follower ? (
                                            <Follow>{currentUserData.follower.length}</Follow>
                                        ) : (
                                            <Follow>0</Follow>
                                        )}
                                        <FollowText>팔로워</FollowText>
                                    </FollowBox>
                                    <FollowingBox
                                        onPress={() => navigation.navigate('MainStack', { screen: 'Following' })}
                                    >
                                        {currentUserData && currentUserData.following ? (
                                            <Following>{currentUserData.following.length}</Following>
                                        ) : (
                                            <Following>0</Following>
                                        )}
                                        <FollowText>팔로잉</FollowText>
                                    </FollowingBox>
                                </FollowContainer>
                            </ProfileRightBox>
                        </ProfileBox>
                    )}
                </>
            )}
            <Tab.Navigator
                initialRouteName="Post"
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
                        <PostFeedScreen
                            navigation={navigation}
                            handleScroll={handleScroll}
                            currentUserData={currentUserData}
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
                        <DiaryFeedScreen
                            navigation={navigation}
                            handleScroll={handleScroll}
                            currentUserData={currentUserData}
                        />
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
`;

const ProfileBox = styled.View`
    /* background-color: gray; */
    padding: 20px;
    flex-direction: row;
    align-items: center;
`;

const ProfilePetImgBox = styled.View`
    width: 34%;
`;

const ProfilePetImg = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 12px;
    margin-right: 20px;
`;

const ImageEditBtn = styled.TouchableOpacity`
    position: absolute;
    right: 12px;
    bottom: -6px;
    background-color: rgb(255, 255, 255);
    border-radius: 100px;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
`;

const ProfileRightBox = styled.View`
    flex-direction: row;
    width: 66%;
    justify-content: space-between;
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

const FollowContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const FollowText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: #343c3a;
`;

const FollowBox = styled.TouchableOpacity`
    align-items: center;
    margin-right: 16px;
`;

const Follow = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #343c3a;
`;

const FollowingBox = styled.TouchableOpacity`
    align-items: center;
    margin-right: 16px;
`;

const Following = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #343c3a;
`;

const Title = styled.Text``;

const LogoutBtn = styled.TouchableOpacity`
    background-color: red;
`;

const Logout = styled.Text`
    color: white;
`;

const UserID = styled.Text`
    color: #243e35;
    font-size: 18px;
    font-weight: 600;
`;

const SetupButton = styled.View``;

const SettingButton = styled.View`
    margin-left: 20px;
`;

export default ProfileScreen;
