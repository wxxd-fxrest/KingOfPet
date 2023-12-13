import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CreateDiaryScreen = () => {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(true);
    const [third, setThird] = useState(false);
    const [significant, setSignificant] = useState('');

    const typeFirst = useRef();
    const typeSecond = useRef();
    const typeThird = useRef();
    return (
        <Container>
            <QnABox>
                <Title>컨디션 체크!</Title>
                <PetInputTitle>오늘 반려동물의 기분은 어때보였나요?</PetInputTitle>
                <PetCheckBox
                    size={20}
                    fillColor="#243e35"
                    unfillColor="#f9f9f7"
                    text="최상, 날아다녀요"
                    ref={typeFirst}
                    isChecked={first}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{
                        textDecorationLine: 'none',
                        fontSize: 14,
                    }}
                    onPress={() => {
                        if (typeFirst.current.state.checked === true) {
                            if (typeSecond.current.state.checked === true) {
                                typeSecond.current.onPress();
                            }
                            if (typeThird.current.state.checked === true) {
                                typeThird.current.onPress();
                                setThird(false);
                            }
                            setFirst(!first);
                        }
                        console.log(typeFirst.current.state.checked);
                    }}
                />
                <PetCheckBox
                    size={20}
                    fillColor="#243e35"
                    unfillColor="#f9f9f7"
                    text="평균, 밥 잘 먹고 잘 자요"
                    ref={typeSecond}
                    isChecked={second}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{
                        textDecorationLine: 'none',
                        fontSize: 14,
                    }}
                    onPress={() => {
                        if (typeSecond.current.state.checked === true) {
                            if (typeFirst.current.state.checked === true) {
                                typeFirst.current.onPress();
                            }
                            if (typeThird.current.state.checked === true) {
                                typeThird.current.onPress();
                                setThird(false);
                            }
                            setSecond(!second);
                        }
                    }}
                />
                <PetCheckBox
                    size={20}
                    fillColor="#243e35"
                    unfillColor="#f9f9f7"
                    text="우울, 평소보다 기운이 없어요"
                    ref={typeThird}
                    isChecked={third}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{
                        textDecorationLine: 'none',
                        fontSize: 14,
                    }}
                    onPress={() => {
                        if (typeThird.current.state.checked === true) {
                            if (typeFirst.current.state.checked === true) {
                                typeFirst.current.onPress();
                            }
                            if (typeSecond.current.state.checked === true) {
                                typeSecond.current.onPress();
                            }
                            setThird(!third);
                        }
                    }}
                />
            </QnABox>
            <QnABox>
                <Title
                    style={{
                        marginBottom: 12,
                    }}
                >
                    오늘의 특이사항
                </Title>
                <SetSignificantInputBox>
                    <SetSignificantInput
                        value={significant}
                        keyboardType="default"
                        placeholder="무슨 일이 있었나요? (최대 20자)"
                        placeholderTextColor="grey"
                        returnKeyType="done"
                        maxLength={20}
                        // onSubmitEditing={onSubmitPasswordEditing}
                        onChangeText={(text) => {
                            setSignificant(text);
                        }}
                    />
                    <DeleteBtn
                        activeOpacity={0.6}
                        onPress={() => {
                            setSignificant('');
                        }}
                    >
                        <Feather name="x-circle" size={24} color="#86918d" />
                    </DeleteBtn>
                </SetSignificantInputBox>
            </QnABox>
        </Container>
    );
};

const Container = styled.View`
    justify-content: center;
    align-items: center;
`;

const DiaryTitle = styled.Text`
    color: #636362;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    padding: 0px 6px;
`;

const QnABox = styled.View`
    background-color: #d5d5d4;
    padding: 12px;
    border-radius: 12px;
    width: 100%;
    margin-top: 12px;
`;

const Title = styled.Text`
    color: #636362;
    font-size: 14px;
    font-weight: 600;
    margin: 6px 0px;
    padding: 0px 6px;
`;

const PetInputTitle = styled.Text`
    color: #636362;
    font-size: 12px;
    margin-bottom: 12px;
    padding: 0px 6px;
`;

const SetSignificantInputBox = styled.View`
    flex-direction: row;
    margin-bottom: 15px;
    align-items: center;
`;

const SetSignificantInput = styled.TextInput`
    background-color: #f9f9f7;
    padding: 0px 20px;
    border-radius: 12px;
    font-size: 14px;
    width: 100%;
    height: 50px;
`;

const DeleteBtn = styled.TouchableOpacity`
    position: absolute;
    right: 5%;
    z-index: 1;
`;

const PetCheckBox = styled(BouncyCheckbox)`
    margin-bottom: 10px;
    padding: 0px 6px;
`;

export default CreateDiaryScreen;
