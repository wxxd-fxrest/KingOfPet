import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';

const Root = createNativeStackNavigator();

const AuthRoot = () => {
    return (
        <Root.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Root.Screen name="AuthStack" component={AuthStack} />
        </Root.Navigator>
    );
};

export default AuthRoot;
