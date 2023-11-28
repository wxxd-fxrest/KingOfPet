import React from 'react';
import styled from 'styled-components';
import LogoImage from '../assets/logo.png';
import Kakao from '../assets/kakao-talk.png';
import Google from '../assets/social.png';
import Naver from '../assets/naver.png';

const StartScreen = ({ navigation }) => {
    return (
        <Container>
            <Logo source={LogoImage} />
            <AuthBox>
                <AuthButton
                    activeOpacity={0.6}
                    style={{
                        backgroundColor: '#f9e000',
                    }}
                >
                    <IconImage source={Kakao} />
                    <JoinTitle style={{ color: '#243e35' }}>카카오로 시작</JoinTitle>
                </AuthButton>
                <AuthButton
                    activeOpacity={0.6}
                    style={{
                        backgroundColor: '#f9f9f7',
                        borderColor: '#d5d5d4',
                        borderWidth: 1,
                    }}
                >
                    <IconImage source={Google} />

                    <JoinTitle style={{ color: '#243e35' }}>구글로 시작</JoinTitle>
                </AuthButton>
                <AuthButton
                    activeOpacity={0.6}
                    style={{
                        backgroundColor: '#1EC800',
                    }}
                >
                    <IconImage source={Naver} />
                    <JoinTitle style={{ color: '#243e35' }}>네이버로 시작</JoinTitle>
                </AuthButton>
                <AuthButton
                    activeOpacity={0.6}
                    style={{
                        marginBottom: 0,
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('AuthStack', { screen: 'Join' })}
                >
                    <JoinTitle>이메일 로그인/회원가입</JoinTitle>
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
    background-color: #929f9a;
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
