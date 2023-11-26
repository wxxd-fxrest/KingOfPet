import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#6b8a47',
                tabBarInactiveTintColor: '#a7c585',
            }}
        >
            {/* <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{
                    title: '홈',
                    headerShown: true,
                    headerShadowVisible: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, size }) => {
                        return <Fontisto name="island" size={size} color={focused ? '#6b8a47' : '#a7c585'} />;
                    },
                }}
            />
            <Tab.Screen
                name="MyProfile"
                component={ProfileScreen}
                options={{
                    title: '프로필',
                    headerShown: true,
                    headerShadowVisible: false,
                    showLable: false,
                    tabBarIcon: ({ focused, size }) => {
                        return (
                            <MaterialCommunityIcons name="dog" size={size} color={focused ? '#6b8a47' : '#a7c585'} />
                        );
                    },
                }}
            /> */}
        </Tab.Navigator>
    );
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default MainTab;
