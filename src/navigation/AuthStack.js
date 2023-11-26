import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/auth/LoginScreen';
import JoinScreen from '../screens/auth/JoinScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: '로그인',
                    headerShown: true,
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="Join"
                component={JoinScreen}
                options={{
                    title: '회원가입',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <SetupButton onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back-ios" size={25} color="gray" />
                        </SetupButton>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default AuthStack;
