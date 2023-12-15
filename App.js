import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import MainRoot from './src/navigation/MainRoot';
import AuthRoot from './src/navigation/AuthRoot';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { REACT_GOOGLE_AUTH_KEY } from '@env';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components';

const Stack = createNativeStackNavigator();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
    const [ready, setReady] = useState(false);
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [hide, setHide] = useState(true);

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setHide(offsetY > 0 ? false : true);
    };

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                setIsAuthentication(true);
            } else {
                setIsAuthentication(false);
            }
            console.log('App.js', currentUser);
        });
    }, [currentUser]);

    useEffect(() => {
        const loadApp = async () => {
            const fonts = loadFonts([Ionicons.font]);
            await Promise.all([...fonts]);
            setReady(true);
        };

        loadApp();
    }, []);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: `${REACT_GOOGLE_AUTH_KEY}`,
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthentication ? (
                    <Stack.Screen name="MainRoot" options={{ headerShown: false }}>
                        {(props) => <MainRoot {...props} handleScroll={handleScroll} hide={hide} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="AuthRoot" options={{ headerShown: false }}>
                        {(props) => <AuthRoot {...props} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
            <StatusBar barStyle="auto" />
        </NavigationContainer>
    );
}

const Container = styled.View`
    flex: 1;
    background-color: #f9f9f7;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f7',
    },
});
