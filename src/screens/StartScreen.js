import React from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import LogoImage from '../assets/logo.png';
import Kakao from '../assets/kakao-talk.png';
import Google from '../assets/social.png';
import Email from '../assets/arroba.png';

const StartScreen = ({ navigation }) => {
    const onGoogleSignInPress = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const res = await auth().signInWithCredential(googleCredential);

        const userDoc = await firestore().collection('Users').doc(`${res.additionalUserInfo.profile.email}`).get();
        const userData = userDoc.data();

        if (!userData) {
            // 사용자 데이터가 없을 때 Firestore에 데이터 추가
            await firestore()
                .collection('Users')
                .doc(`${res.additionalUserInfo.profile.email}`)
                .set({
                    email: `${res.additionalUserInfo.profile.email}`,
                    userid: `${res.additionalUserInfo.profile.name}`,
                    petname: '',
                    petimage: '',
                    type: '',
                    createprofile: false,
                    signType: 'Google',
                })
                .then(() => {
                    console.log('User added!');
                });
        }

        if (!res.additionalUserInfo.profile) {
            Alert.alert('다시 시도해 주세요.', '로그인이 정상적으로 진행되지 않았습니다.');
        }
    };

    const login = () => {
        KakaoLogin.login()
            .then((result) => {
                console.log('Login Success', JSON.stringify(result));
                getProfile();
            })
            .catch((error) => {
                if (error.code === 'E_CANCELLED_OPERATION') {
                    console.log('Login Cancel', error.message);
                } else {
                    console.log(`Login Fail(code:${error.code})`, error.message);
                }
            });
    };

    const getProfile = () => {
        KakaoLogin.getProfile()
            .then(async (result) => {
                console.log('GetProfile Success', result);
                const email = result.email;
                const password = 'A!@' + result.id;

                const userDoc = await firestore().collection('Users').doc(`${email}`).get();
                const userData = userDoc.data();

                if (userData) {
                    await auth().signInWithEmailAndPassword(email, password);
                }

                if (!userData) {
                    // 사용자 데이터가 없을 때 Firestore에 데이터 추가
                    auth().createUserWithEmailAndPassword(email, password);
                    firestore()
                        .collection('Users')
                        .doc(`${email}`)
                        .set({
                            email: `${email}`,
                            userid: `${result.nickname}`,
                            petname: '',
                            petimage: '',
                            type: '',
                            createprofile: false,
                            signType: 'KaKao',
                        })
                        .then(() => {
                            console.log('User added!');
                        });
                }
            })
            .catch((error) => {
                console.log(`GetProfile Fail(code:${error.code})`, error.message);
            });
    };

    return (
        <Container>
            <Logo source={LogoImage} />
            <AuthBox>
                <AuthButton
                    activeOpacity={0.6}
                    style={{
                        backgroundColor: '#f9e000',
                    }}
                    onPress={() => login()}
                >
                    <IconImage source={Kakao} />
                    <JoinTitle style={{ color: '#243e35' }}>카카오로 시작</JoinTitle>
                </AuthButton>
                <AuthButton
                    activeOpacity={0.6}
                    style={{
                        // backgroundColor: '#f9f9f7',
                        backgroundColor: '#d5d5d4',
                    }}
                    onPress={onGoogleSignInPress}
                >
                    <IconImage source={Google} />
                    <JoinTitle style={{ color: '#243e35' }}>구글로 시작</JoinTitle>
                </AuthButton>
                <AuthButton
                    activeOpacity={0.6}
                    style={{
                        backgroundColor: '#f9f9f7',
                        borderColor: '#d5d5d4',
                        borderWidth: 1,
                        marginBottom: 0,
                    }}
                    onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}
                >
                    <IconImage source={Email} />
                    <JoinTitle>이메일로 시작</JoinTitle>
                </AuthButton>
            </AuthBox>
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Logo = styled.Image`
    width: 300px;
    height: 150px;
    margin-bottom: 50px;
`;

const AuthBox = styled.View`
    width: 60%;
    justify-content: center;
    align-items: center;
`;

const AuthButton = styled.TouchableOpacity`
    background-color: #c1ccc8;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-bottom: 16px;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 30px;
`;

const IconImage = styled.Image`
    width: 20px;
    height: 20px;
`;

const JoinTitle = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: #243e35;
`;

export default StartScreen;
