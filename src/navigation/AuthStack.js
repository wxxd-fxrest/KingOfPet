import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/auth/LoginScreen';
import JoinScreen from '../screens/auth/JoinScreen';
import StartScreen from '../screens/StartScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Auth" component={StartScreen} />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: '로그인',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#f9f9f7',
                    },
                    headerTintColor: '#243e35',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <SetupButton onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back-ios" size={25} color="#243e35" />
                        </SetupButton>
                    ),
                    headerRight: () => (
                        <LoginButton onPress={() => navigation.navigate('Join')}>
                            <LoginText>회원가입</LoginText>
                        </LoginButton>
                    ),
                }}
            />
            <Stack.Screen
                name="Join"
                component={JoinScreen}
                options={{
                    title: '회원가입',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#f9f9f7',
                    },
                    headerTintColor: '#243e35',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <SetupButton onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back-ios" size={25} color="#243e35" />
                        </SetupButton>
                    ),
                    headerRight: () => (
                        <LoginButton onPress={() => navigation.navigate('Login')}>
                            <LoginText>로그인</LoginText>
                        </LoginButton>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

const LoginButton = styled.TouchableOpacity`
    margin-left: 20px;
`;

const LoginText = styled.Text`
    color: #243e35;
    font-weight: 600;
`;

export default AuthStack;
