import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components';
import MainScreen from '../screens/main/MainScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AlertScreen from '../screens/alert/AlertScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTab = ({ handleScroll, hide, postData }) => {
    return (
        <Tab.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: '#f9f9f7' },
                headerStyle: { backgroundColor: '#f9f9f7' },
            }}
        >
            <Tab.Screen
                name="Alert"
                component={AlertScreen}
                options={{
                    title: '알림',
                    headerShown: true,
                    headerShadowVisible: false,
                    showLable: false,
                    tabBarIcon: ({ focused, size }) => {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? 'bell-badge' : 'bell-badge-outline'}
                                size={28}
                                color={focused ? '#243e35' : '#c1ccc8'}
                            />
                        );
                    },
                }}
            />

            <Tab.Screen
                name="Main"
                children={() => <MainScreen handleScroll={handleScroll} hide={hide} postData={postData} />}
                options={{
                    title: '홈',
                    headerShown: hide,
                    headerShadowVisible: false,
                    tabBarIcon: ({ focused, size }) => {
                        return <MaterialIcons name="pets" size={size} color={focused ? '#243e35' : '#c1ccc8'} />;
                    },
                }}
            />

            <Tab.Screen
                name="MyProfile"
                children={() => <ProfileScreen postData={postData} />}
                options={{
                    title: '프로필',
                    headerShown: true,
                    headerShadowVisible: false,
                    tabBarIcon: ({ focused, size }) => {
                        return <Ionicons name="person" size={size} color={focused ? '#243e35' : '#c1ccc8'} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default MainTab;
