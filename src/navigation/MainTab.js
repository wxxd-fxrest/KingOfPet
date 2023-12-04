import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components';
import MainScreen from '../screens/main/MainScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    const [hide, setHide] = useState(true);

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // 여기에 스크롤 감지 시 실행할 코드를 작성합니다.
        // console.log('Scroll OffsetY:', offsetY);

        if (offsetY > 0) {
            setHide(false);
        } else if (offsetY <= 0) {
            setHide(true);
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#6b8a47',
                tabBarInactiveTintColor: '#a7c585',
                tabBarStyle: { backgroundColor: '#f9f9f7' },
                headerStyle: { backgroundColor: '#f9f9f7' },
            }}
        >
            <Tab.Screen
                name="Main"
                children={() => <MainScreen handleScroll={handleScroll} />}
                options={{
                    title: '홈',
                    headerShown: hide,
                    headerShadowVisible: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, size }) => {
                        return <MaterialIcons name="pets" size={size} color={focused ? '#243e35' : '#c1ccc8'} />;
                    },
                }}
            />
            <Tab.Screen
                name="MyProfile"
                component={ProfileScreen}
                // children={() => <ProfileScreen handleScroll={handleScroll} />}
                options={{
                    title: '프로필',
                    headerShown: true,
                    headerShadowVisible: false,
                    showLable: false,
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
