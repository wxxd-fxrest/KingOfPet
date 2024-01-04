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
import OnBoarding from './src/screens/onboarding/OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
    const [ready, setReady] = useState(false);
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [hide, setHide] = useState(true);
    const [onBoardingSeen, setOnBoardingSeen] = useState(false);
    console.log(onBoardingSeen);

    useEffect(() => {
        // Async 함수를 사용하여 AsyncStorage에서 'onBoardingSeen' 값을 읽어옴
        const checkOnBoardingSeen = async () => {
            try {
                const value = await AsyncStorage.getItem('onBoardingSeen');
                if (value !== null) {
                    setOnBoardingSeen(false);
                }
            } catch (e) {
                console.error('AsyncStorage Error:', e);
            }
        };

        checkOnBoardingSeen();
    }, []);

    const handleOnBoardingSeen = async () => {
        try {
            // Async 함수를 사용하여 'onBoardingSeen' 값을 저장
            await AsyncStorage.setItem('onBoardingSeen', 'true');
            setOnBoardingSeen(true);
        } catch (e) {
            console.error('AsyncStorage Error:', e);
        }
    };

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
            {onBoardingSeen ? (
                <Stack.Navigator>
                    {isAuthentication ? (
                        <Stack.Screen name="MainRoot" options={{ headerShown: false }}>
                            {(props) => (
                                <MainRoot {...props} handleScroll={handleScroll} hide={hide} postData={postData} />
                            )}
                        </Stack.Screen>
                    ) : (
                        <Stack.Screen name="AuthRoot" options={{ headerShown: false }}>
                            {(props) => <AuthRoot {...props} />}
                        </Stack.Screen>
                    )}
                </Stack.Navigator>
            ) : (
                <OnBoarding handleOnBoardingSeen={handleOnBoardingSeen} />
            )}
            <StatusBar barStyle="auto" />
        </NavigationContainer>
    );
}
