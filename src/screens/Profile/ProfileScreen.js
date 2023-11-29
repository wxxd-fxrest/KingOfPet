import React from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
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
                    onPress: () => auth().signOut(),
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
