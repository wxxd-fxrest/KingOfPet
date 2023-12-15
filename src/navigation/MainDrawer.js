import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainRoot from './MainRoot.js';
import { MaterialIcons } from '@expo/vector-icons';
import ImportantDiarSceren from '../screens/diary/ImportantDiarSceren.js';

const NavigateDrawer = createDrawerNavigator();

const MainDrawer = ({ handleScroll, hide }) => {
    return (
        <NavigateDrawer.Navigator
            initialRouteName="Home"
            NavigateDrawerPosition="left"
            backBehavior="history"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#f9f9f7',
                    width: 240,
                },

                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                drawerLabelStyle: {
                    fontWeight: 'bold',
                },
                drawerActiveTintColor: '#243e35',
                drawerInactiveTintColor: '#929f9a',
            }}
            // drawerContent={(props) => (
            //     <CustomDrawer {...props} getUserData={getUserData} getProfileData={getProfileData} />
            // )}
        >
            <NavigateDrawer.Screen
                name="Home"
                children={() => <MainRoot handleScroll={handleScroll} hide={hide} />}
                options={{
                    headerShown: false,
                    drawerIcon: ({ focused }) => {
                        return <MaterialIcons name="pets" size={24} color={focused ? '#243e35' : '#929f9a'} />;
                    },
                }}
            />

            <NavigateDrawer.Screen
                name="중요!"
                children={() => <ImportantDiarSceren />}
                options={{
                    headerShown: true,
                    drawerIcon: ({ focused }) => {
                        return <MaterialIcons name="pets" size={24} color={focused ? '#243e35' : '#929f9a'} />;
                    },
                }}
            />
        </NavigateDrawer.Navigator>
    );
};

export default MainDrawer;
