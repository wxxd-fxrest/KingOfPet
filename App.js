import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import MainRoot from './src/navigation/MainRoot';
import AuthRoot from './src/navigation/AuthRoot';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
    const [ready, setReady] = useState(false);
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                setIsAuthentication(true);
            } else {
                setIsAuthentication(false);
            }
        });
    }, [currentUser]);

    const onFinish = () => setReady(true);

    const startLoading = async () => {
        const fonts = loadFonts([Ionicons.font]);
        await Promise.all([...fonts]);
    };

    if (!ready) {
        return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                {isAuthentication ? <MainRoot /> : <AuthRoot />}
                <StatusBar barStyle="auto" />
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
