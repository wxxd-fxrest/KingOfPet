import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { styled } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Animatable from 'react-native-animatable';

const Join = () => {
    const [different, setDifferent] = useState(false);
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

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            firestore()
                .collection('Users')
                .doc(`${userCredential.user.email}`)
                .set({
                    email: `${userCredential.user.email}`,
                    name: `${userCredential.user.email.split('@')[0]}`,
                })
                .then(() => {
                    console.log('User added!');
                });
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
                    <EmailCheckBtn activeOpacity={0.6}>
                        <CheckText>중복확인</CheckText>
                    </EmailCheckBtn>
                </EmailBox>

                <TextInputTitle>비밀번호를 입력해 주세요.</TextInputTitle>
                <PasswordBox>
                    <PasswordTextInput
                        value={password}
                        ref={passwordInput}
                        placeholder="password"
                        placeholderTextColor="grey"
                        secureTextEntry
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

                <TextInputTitle>반려동물을 소개해 주세요!</TextInputTitle>
                <PetInfoContainer>
                    <PetInfoBox>
                        <PetInputTitle>사진을 선택해 주세요.</PetInputTitle>
                        <PetImageSelectBox activeOpacity={0.6}>
                            <PreviewBox>
                                <Feather name="camera" size={24} color="#86918d" />
                            </PreviewBox>
                        </PetImageSelectBox>
                    </PetInfoBox>
                    <PetInfoBox>
                        <PetInputTitle>이름을 알려주세요.</PetInputTitle>
                        <PetNameInputBox>
                            <PetNameTextInput
                                value={password}
                                placeholder="Pet Name"
                                placeholderTextColor="grey"
                                keyboardType="text"
                                returnKeyType="done"
                                onSubmitEditing={onSubmitPasswordEditing}
                                onChangeText={(text) => {
                                    setPassword(text);
                                }}
                            />
                        </PetNameInputBox>
                        <PetInputTitle>종을 선택해 주세요.</PetInputTitle>
                        <PetCheckBox
                            size={20}
                            fillColor="#243e35"
                            unfillColor="#f9f9f7"
                            text="강아지"
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{
                                textDecorationLine: 'none',
                            }}
                        />
                        <PetCheckBox
                            size={20}
                            fillColor="#243e35"
                            unfillColor="#f9f9f7"
                            text="고양이"
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{
                                textDecorationLine: 'none',
                            }}
                        />
                        <PetCheckBox
                            size={20}
                            fillColor="#243e35"
                            unfillColor="#f9f9f7"
                            text="기타"
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{
                                textDecorationLine: 'none',
                            }}
                            onPress={() => setDifferent(!different)}
                        />
                        {different === true && (
                            <Animatable.View animation="fadeInUp" duration={600}>
                                <PetInputTitle>반려동물의 종을 입력해 주세요.</PetInputTitle>
                                <PetNameInputBox>
                                    <PetNameTextInput
                                        value={password}
                                        keyboardType="text"
                                        placeholder="Pet Name"
                                        placeholderTextColor="grey"
                                        secureTextEntry
                                        returnKeyType="done"
                                        onSubmitEditing={onSubmitPasswordEditing}
                                        onChangeText={(text) => setPassword(text)}
                                    />
                                </PetNameInputBox>
                            </Animatable.View>
                        )}
                    </PetInfoBox>
                </PetInfoContainer>
            </ScrollView>

            <JoinButton>
                <Button onPress={onSubmitPasswordEditing}>
                    {loading ? <ActivityIndicator color="white" /> : <ButtonText> 가입하기 </ButtonText>}
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
    width: 75%;
    height: 50px;
    padding-right: 45px;
`;

const DeleteTextBtn = styled.TouchableOpacity`
    position: absolute;
    right: 28%;
    z-index: 1;
`;

const EmailCheckBtn = styled.TouchableOpacity`
    background-color: #c1ccc8;
    width: 20%;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    height: 50px;
`;

const CheckText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: #243e35;
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

const PetInputTitle = styled.Text`
    color: #636362;
    font-size: 12px;
    margin-bottom: 10px;
    padding: 0px 6px;
`;

const TextInput = styled.TextInput`
    background-color: rgba(193, 204, 200, 0.3);
    padding: 15px 20px;
    border-radius: 12px;
    font-size: 14px;
    margin-bottom: 20px;
`;

const PetInfoContainer = styled.View`
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
`;

const PetInfoBox = styled.View`
    width: 48%;
`;

const PetImageSelectBox = styled.TouchableOpacity`
    background-color: rgba(193, 204, 200, 0.3);
    width: 100%;
    height: 260px;
    border-radius: 12px;
    margin-bottom: 20px;
`;

const PreviewBox = styled.View`
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const PetNameInputBox = styled.View`
    flex-direction: row;
    margin-bottom: 15px;
    align-items: center;
`;

const PetNameTextInput = styled.TextInput`
    background-color: rgba(193, 204, 200, 0.3);
    padding: 0px 20px;
    border-radius: 12px;
    font-size: 14px;
    width: 100%;
    height: 50px;
`;

const PetCheckBox = styled(BouncyCheckbox)`
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

export default Join;
