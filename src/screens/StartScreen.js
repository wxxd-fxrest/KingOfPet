import React from 'react';
import styled from 'styled-components';
import LogoImage from '../assets/logo.png';
import Kakao from '../assets/kakao-talk.png';
import Google from '../assets/social.png';
import Naver from '../assets/naver.png';

const StartScreen = () => {
    return (
        <Container>
            <Logo source={LogoImage} />
            <AuthBox>
                <AuthButton style={{ backgroundColor: '#f9e000' }}>
                    <IconImage source={Kakao} />
                    <JoinTitle style={{ color: '#243e35' }}>카카오로 시작</JoinTitle>
                </AuthButton>
                <AuthButton style={{ backgroundColor: '#f9f9f7', borderColor: '#d5d5d4', borderWidth: 1 }}>
                    <IconImage source={Google} />

                    <JoinTitle style={{ color: '#243e35' }}>구글로 시작</JoinTitle>
                </AuthButton>
                <AuthButton style={{ backgroundColor: '#1EC800' }}>
                    <IconImage source={Naver} />
                    <JoinTitle style={{ color: '#243e35' }}>네이버로 시작</JoinTitle>
                </AuthButton>
                <AuthButton style={{ marginBottom: 0, justifyContent: 'center' }}>
                    <JoinTitle>이메일 로그인/회원가입</JoinTitle>
                </AuthButton>
            </AuthBox>
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    /* background-color: white; */
    justify-content: center;
    align-items: center;
    flex: 1;
    /* position: relative; */
`;

const Logo = styled.Image`
    width: 300px;
    height: 150px;
    /* aspect-ratio: 1; */
    /* background-color: yellowgreen; */
    margin-bottom: 50px;
`;

const AuthBox = styled.View`
    /* position: absolute; */
    /* bottom: 32%; */
    width: 60%;
    /* height: 15%; */
    /* flex-direction: row; */
    /* justify-content: space-between; */
    justify-content: center;
    align-items: center;
`;

const AuthButton = styled.TouchableOpacity`
    background-color: #929f9a;
    width: 100%;
    /* height: 45%; */
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
