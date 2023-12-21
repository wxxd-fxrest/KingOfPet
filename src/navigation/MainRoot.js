import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import MainTab from './MainTab';

const Root = createNativeStackNavigator();

const MainRoot = ({ handleScroll, hide, postData }) => {
    return (
        <Root.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Root.Screen
                name="MainTab"
                children={() => <MainTab handleScroll={handleScroll} hide={hide} postData={postData} />}
            />
            <Root.Screen name="MainStack" children={() => <MainStack postData={postData} />} />
        </Root.Navigator>
    );
};

export default MainRoot;
