import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components';
import SocialLoginScreen from '../screens/auth/SocialLoginScreen';
import { MaterialIcons } from '@expo/vector-icons';
import CreateAllPostScreen from '../screens/newPost/CreateAllPostScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

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
                    title: '포스트 작성',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <BackButton>
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={25}
                                color="#243e35"
                                onPress={() => navigation.goBack()}
                            />
                        </BackButton>
                    ),
                }}
            />

            <Stack.Screen
                name="NewPostStack"
                component={CreateAllPostScreen}
                options={{
                    title: '포스트 작성',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <BackButton>
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={25}
                                color="#243e35"
                                onPress={() => navigation.goBack()}
                            />
                        </BackButton>
                    ),
                }}
            />

            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    title: '프로필 수정',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <BackButton>
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={25}
                                color="#6b8a47"
                                onPress={() => navigation.goBack()}
                            />
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
