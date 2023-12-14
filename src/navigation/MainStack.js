import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components';
import SocialLoginScreen from '../screens/auth/SocialLoginScreen';
import { MaterialIcons } from '@expo/vector-icons';
import CreateAllPostScreen from '../screens/newPost/CreateAllPostScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import DetailScreen from '../screens/detail/DetailScreen';
import UserProfileScreen from '../screens/detail/UserProfileScreen';
import CommentDetailScreen from '../screens/detail/CommentDetailScreen';
import CreateSelectImgScreen from '../screens/newPost/CreateSelectImgScreen';
import FollowingScreen from '../screens/follow/FollowingScreen';
import FollowerScreen from '../screens/follow/FollowerScreen';

const Stack = createNativeStackNavigator();

const MainStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTintColor: '#243e35',
                headerStyle: { backgroundColor: '#f9f9f7' },
            }}
        >
            <Stack.Screen
                name="SocialLogin"
                component={SocialLoginScreen}
                options={{
                    title: '프로필 수정',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () =>
                        Platform.OS === 'ios' ? (
                            <BackButton onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                            </BackButton>
                        ) : null,
                }}
            />
            <Stack.Screen
                name="NewPostStack"
                component={CreateAllPostScreen}
                options={{
                    title: '포스트 작성',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () =>
                        Platform.OS === 'ios' ? (
                            <BackButton onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                            </BackButton>
                        ) : null,
                }}
            />

            <Stack.Screen
                name="CreateSelectImg"
                component={CreateSelectImgScreen}
                options={{
                    title: '포스트 작성',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () =>
                        Platform.OS === 'ios' ? (
                            <BackButton onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                            </BackButton>
                        ) : null,
                }}
            />

            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    title: '프로필 수정',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () =>
                        Platform.OS === 'ios' ? (
                            <BackButton onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                            </BackButton>
                        ) : null,
                }}
            />

            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    title: '상세페이지',
                    headerShadowVisible: false,
                }}
            />

            <Stack.Screen
                name="CommentDetail"
                component={CommentDetailScreen}
                options={{
                    title: 'Comment',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () =>
                        Platform.OS === 'ios' ? (
                            <BackButton onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                            </BackButton>
                        ) : null,
                }}
            />

            <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{
                    title: 'UserProfile',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () =>
                        Platform.OS === 'ios' ? (
                            <BackButton onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                            </BackButton>
                        ) : null,
                }}
            />

            <Stack.Screen
                name="Follower"
                component={FollowerScreen}
                options={{
                    title: '팔로워',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <BackButton onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                        </BackButton>
                    ),
                }}
            />

            <Stack.Screen
                name="Following"
                component={FollowingScreen}
                options={{
                    title: '팔로잉',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <BackButton onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                        </BackButton>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const BackButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default MainStack;
