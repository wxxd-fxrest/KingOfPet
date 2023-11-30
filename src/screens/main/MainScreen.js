import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const MainScreen = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState([]);
    const [loginUserData, setLoginUserData] = useState([]);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        console.log('main', currentUser);
    }, [currentUser]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users')
            .doc(`${currentUser.email}`)
            .onSnapshot((documentSnapshot) => {
                const userData = documentSnapshot.data();
                setLoginUserData(userData);
                console.log('User data: ', userData);

                if (userData.createprofile === false) {
                    Alert.alert('프로필이 미완성 상태입니다.', '프로필 수정을 통해 프로필을 완성해 주세요!', [
                        // {
                        //     text: 'No',
                        //     onPress: () => console.log('no'),
                        //     style: 'destructive',
                        // },
                        {
                            text: 'Yes',
                            onPress: () => navigation.navigate('MainStack', { screen: 'SocialLoginScreen' }),
                        },
                    ]);
                }
            });

        return () => subscriber();
    }, [currentUser]);

    return (
        <Container>
            <Title> {currentUser.email} </Title>
        </Container>
    );
};

const Container = styled.View``;

const Title = styled.Text``;

export default MainScreen;
