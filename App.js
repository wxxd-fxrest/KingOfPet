import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { REACT_GOOGLE_AUTH_KEY } from '@env';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import MainRoot from './src/navigation/MainRoot';
import AuthRoot from './src/navigation/AuthRoot';

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

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const subscriber = firestore()
                .collection('Posts')
                .orderBy('orderBy', 'desc')
                .onSnapshot((documentSnapshot) => {
                    if (documentSnapshot) {
                        let feedArray = [];
                        documentSnapshot.forEach((doc) => {
                            feedArray.push({
                                DocID: doc.id,
                                Data: doc.data(),
                            });
                        });
                        setPostData(feedArray);
                    }
                });

            return () => {
                clearTimeout(timeoutId);
                subscriber();
            };
        }, 500); // 2초 후에 실행
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthentication ? (
                    <Stack.Screen name="MainRoot" options={{ headerShown: false }}>
                        {(props) => <MainRoot {...props} handleScroll={handleScroll} hide={hide} postData={postData} />}
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
