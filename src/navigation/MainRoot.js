import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainStack from './MainStack';
import MainTab from './MainTab';

const Root = createNativeStackNavigator();

const MainRoot = ({ handleScroll, hide }) => {
    return (
        <Root.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Root.Screen name="MainTab" children={() => <MainTab handleScroll={handleScroll} hide={hide} />} />
            <Root.Screen name="MainStack" component={MainStack} />
        </Root.Navigator>
    );
};

export default MainRoot;
