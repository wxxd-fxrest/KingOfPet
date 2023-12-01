import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

const ProfileScreen = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        console.log('logot', currentUser);
        firestore()
            .collection('Users')
            .doc(`${currentUser.email}`)
            .onSnapshot((documentSnapshot) => {
                setUserData(documentSnapshot.data());
                // console.log('lgoout User data: ', documentSnapshot.data());
            });
    }, [currentUser]);

    const onLogOut = () => {
        Alert.alert(
            'Log Out',
            '정말로 로그아웃하시겠습니까?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('no'),
                    style: 'destructive',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        if (userData.signType === 'Google' || userData.signType === 'Email') {
                            auth().signOut();
                            console.log('firebase logout message');
                        } else if (userData.signType === 'KaKao') {
                            const message = await KakaoLogin.logout();
                            console.log('kakao logout message', message);
                            auth().signOut();
                            console.log('firebase logout message');
                        }
                    },
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return (
        <Container>
            <Title> profile </Title>
            <LogoutBtn onPress={onLogOut}>
                <Logout> 로그아웃 </Logout>
            </LogoutBtn>
        </Container>
    );
};

const Container = styled.View``;

const Title = styled.Text``;

const LogoutBtn = styled.TouchableOpacity`
    background-color: red;
`;

const Logout = styled.Text`
    color: white;
`;

export default ProfileScreen;
