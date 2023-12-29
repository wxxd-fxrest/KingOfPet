import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { styled } from 'styled-components';

const CreateQuestionScreen = ({ typeHealth, typeLife, typeEtc }) => {
    const [health, setHealth] = useState(false);
    const [life, setLife] = useState(true);
    const [etc, setEtc] = useState(false);

    return (
        <Container onPress={() => keyboard.dismiss()}>
            <QnABox health={health}>
                <Title>질문할게요!</Title>
                <PetInputTitle>세부사항을 선택해 주세요.</PetInputTitle>
                <PetCheckBox
                    size={20}
                    fillColor="#243e35"
                    unfillColor="#f9f9f7"
                    text="건강"
                    ref={typeHealth}
                    isChecked={health}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{
                        textDecorationLine: 'none',
                        fontSize: 14,
                    }}
                    onPress={() => {
                        if (typeHealth.current.state.checked === true) {
                            if (typeLife.current.state.checked === true) {
                                typeLife.current.onPress();
                            }
                            if (typeEtc.current.state.checked === true) {
                                typeEtc.current.onPress();
                                // setEtc(false);
                            }
                            setHealth(true);
                        } else if (typeHealth.current.state.checked === false) {
                            setHealth(false);
                        }
                        console.log('typeHealth', typeHealth.current.state.checked);
                    }}
                />
                <PetCheckBox
                    size={20}
                    fillColor="#243e35"
                    unfillColor="#f9f9f7"
                    text="생활"
                    ref={typeLife}
                    isChecked={life}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{
                        textDecorationLine: 'none',
                        fontSize: 14,
                    }}
                    onPress={() => {
                        if (typeLife.current.state.checked === true) {
                            if (typeHealth.current.state.checked === true) {
                                typeHealth.current.onPress();
                            }
                            if (typeEtc.current.state.checked === true) {
                                typeEtc.current.onPress();
                                // setEtc(false);
                            }
                            setLife(true);
                        } else if (typeLife.current.state.checked === false) {
                            setLife(false);
                        }
                        console.log('typeLife', typeLife.current.state.checked);
                        console.log('life', life);
                    }}
                />
                <PetCheckBox
                    size={20}
                    fillColor="#243e35"
                    unfillColor="#f9f9f7"
                    text="기타"
                    ref={typeEtc}
                    isChecked={etc}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{
                        textDecorationLine: 'none',
                        fontSize: 14,
                    }}
                    onPress={() => {
                        if (typeEtc.current.state.checked === true) {
                            if (typeHealth.current.state.checked === true) {
                                typeHealth.current.onPress();
                            }
                            if (typeLife.current.state.checked === true) {
                                typeLife.current.onPress();
                            }
                            setEtc(true);
                        } else if (typeEtc.current.state.checked === false) {
                            setEtc(false);
                        }
                        console.log('typeEtc', typeEtc.current.state.checked);
                    }}
                />
            </QnABox>
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-top: 16px;
`;

const QnABox = styled.View`
    background-color: #d5d5d4;
    padding: 8px;
    border-radius: 12px;
    width: 100%;
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

const PetCheckBox = styled(BouncyCheckbox)`
    margin-bottom: 10px;
    padding: 0px 6px;
`;

export default CreateQuestionScreen;
