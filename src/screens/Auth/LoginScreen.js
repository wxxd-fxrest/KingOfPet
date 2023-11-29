import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { styled } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = () => {
    const [eyeOff, setEyeOff] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const passwordInput = useRef();

    const onSubmitEmailEditing = () => {
        passwordInput.current.focus();
    };

    const onSubmitPasswordEditing = async () => {
        if (email === '' || password === '') {
            return Alert.alert('Fill in the form.');
        }

        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            // console.log(userCredential.user.email);
        } catch (e) {
            switch (e.code) {
                case 'auth/user-not-found' || 'auth/wrong-password':
                    return Alert.alert('이메일 혹은 비밀번호가 일치하지 않습니다.', [
                        {
                            text: '확인',
                            onPress: setLoading(false),
                        },
                    ]);
                case 'auth/email-already-in-use':
                    return Alert.alert('이미 사용 중인 이메일입니다.', [
                        {
                            text: '확인',
                            onPress: setLoading(false),
                        },
                    ]);
                case 'auth/weak-password':
                    return Alert.alert('비밀번호는 6글자 이상이어야 합니다.', [
                        {
                            text: '확인',
                            onPress: setLoading(false),
                        },
                    ]);
                case 'auth/network-request-failed':
                    return Alert.alert('네트워크 연결에 실패 하였습니다.', [
                        {
                            text: '확인',
                            onPress: setLoading(false),
                        },
                    ]);
                case 'auth/invalid-email':
                    return Alert.alert('잘못된 이메일 형식입니다.', [
                        {
                            text: '확인',
                            onPress: setLoading(false),
                        },
                    ]);
                case 'auth/internal-error':
                    return Alert.alert('잘못된 요청입니다.', [
                        {
                            text: '확인',
                            onPress: setLoading(false),
                        },
                    ]);
                default:
                    return Alert.alert('로그인에 실패 하였습니다.', [
                        {
                            text: '확인',
                            onPress: setLoading(false),
                        },
                    ]);
            }
        }
    };

    return (
        <Container onPress={() => keyboard.dismiss()}>
            <ScrollView>
                <TextInputTitle>이메일을 입력해 주세요.</TextInputTitle>
                <EmailBox>
                    <EmailInput
                        value={email}
                        placeholder="email"
                        placeholderTextColor="grey"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={onSubmitEmailEditing}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <DeleteTextBtn
                        activeOpacity={0.6}
                        onPress={() => {
                            setEmail('');
                        }}
                    >
                        <Feather name="x-circle" size={24} color="#86918d" />
                    </DeleteTextBtn>
                </EmailBox>

                <TextInputTitle>비밀번호를 입력해 주세요.</TextInputTitle>
                <PasswordBox>
                    <PasswordTextInput
                        value={password}
                        ref={passwordInput}
                        placeholder="password"
                        placeholderTextColor="grey"
                        secureTextEntry={eyeOff === true ? false : true}
                        returnKeyType="done"
                        onSubmitEditing={onSubmitPasswordEditing}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <ViewPasswordBtn
                        activeOpacity={0.6}
                        onPress={() => {
                            setEyeOff(!eyeOff);
                        }}
                    >
                        <MaterialCommunityIcons
                            name={eyeOff === false ? 'eye-off-outline' : 'eye-outline'}
                            size={24}
                            color="#86918d"
                        />
                    </ViewPasswordBtn>
                </PasswordBox>
            </ScrollView>

            <JoinButton>
                <Button onPress={onSubmitPasswordEditing}>
                    {loading ? <ActivityIndicator color="white" /> : <ButtonText> 로그인 </ButtonText>}
                </Button>
            </JoinButton>
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
    padding: 20px;
`;

const EmailBox = styled.View`
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 20px;
    position: relative;
    align-items: center;
`;

const EmailInput = styled.TextInput`
    background-color: rgba(193, 204, 200, 0.3);
    padding: 0px 20px;
    border-radius: 12px;
    font-size: 14px;
    width: 100%;
    height: 50px;
    padding-right: 45px;
`;

const DeleteTextBtn = styled.TouchableOpacity`
    position: absolute;
    right: 3%;
    z-index: 1;
`;

const PasswordBox = styled.View`
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 20px;
    position: relative;
    align-items: center;
`;

const PasswordTextInput = styled.TextInput`
    background-color: rgba(193, 204, 200, 0.3);
    padding: 0px 20px;
    border-radius: 12px;
    font-size: 14px;
    width: 100%;
    height: 50px;
    padding-right: 45px;
`;

const ViewPasswordBtn = styled.TouchableOpacity`
    position: absolute;
    right: 3%;
`;

const TextInputTitle = styled.Text`
    color: #636362;
    font-size: 14px;
    margin-bottom: 10px;
    padding: 0px 6px;
`;

const JoinButton = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    bottom: 0px;
`;

const Button = styled.TouchableOpacity`
    background-color: #243e35;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`;

const ButtonText = styled.Text`
    color: #f9f9f7;
`;

export default LoginScreen;
