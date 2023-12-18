import React, { useRef, useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { styled } from 'styled-components';

const CreateQuestionScreen = () => {
    const [health, setHealth] = useState(false);
    const [life, setLife] = useState(true);
    const [etc, setEtc] = useState(false);

    const typeHealth = useRef();
    const typeLife = useRef();
    const typeEtc = useRef();

    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(true);
    const [third, setThird] = useState(false);

    const typeFirst = useRef();
    const typeSecond = useRef();
    const typeThird = useRef();

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
                                setEtc(false);
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
                                setEtc(false);
                            }
                            setLife(!second);
                        }
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
                            setEtc(!third);
                        }
                    }}
                />
            </QnABox>

            {health && (
                <QnABox
                    health={health}
                    style={{
                        backgroundColor: 'rgba(252, 147, 128, 0.4)',
                    }}
                >
                    <>
                        <Title>건강에 대한 질문입니다.</Title>
                        <PetInputTitle>응급도를 선택해 주세요.</PetInputTitle>
                        <PetCheckBox
                            size={20}
                            fillColor="#243e35"
                            unfillColor="#f9f9f7"
                            text="상"
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
                            text="중"
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
                            text="하"
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
                    </>
                </QnABox>
            )}
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
    width: ${({ health }) => (health === true ? '48%' : '100%')};
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
