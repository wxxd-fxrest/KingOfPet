import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Alert, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CreateQuestionScreen from './CreateQuestionScreen';
import CreateDiaryScreen from './CreateDiaryScreen';
import { MaterialIcons } from '@expo/vector-icons';

const CreateAllPostScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [pickerValue, setPickerValue] = useState('');
    const [write, setWrite] = useState('');
    const [significant, setSignificant] = useState('');

    const typeHealth = useRef();
    const typeLife = useRef();
    const typeEtc = useRef();

    const typeFirst = useRef();
    const typeSecond = useRef();
    const typeThird = useRef();

    const onSubmitPasswordEditing = async () => {
        if (pickerValue === '' || pickerValue === '선택') {
            Alert.alert('카테고리를 선택해 주세요!');
        } else {
            if (pickerValue === 'QnA') {
                if (write === '') {
                    Alert.alert('텍스트를 입력해 주세요!');
                } else {
                    const QnAType =
                        typeHealth.current.state.checked === true
                            ? { type: '건강' }
                            : typeLife.current.state.checked === true
                            ? { type: '생활' }
                            : typeEtc.current.state.checked === true
                            ? { type: '기타' }
                            : null;

                    let healthType;
                    if (typeHealth.current.state.checked === true) {
                        healthType =
                            typeFirst.current.state.checked === true
                                ? { type: '상' }
                                : typeSecond.current.state.checked === true
                                ? { type: '중' }
                                : typeThird.current.state.checked === true
                                ? { type: '하' }
                                : null;
                    }

                    navigation.navigate('MainStack', {
                        screen: 'CreateSelectImg',
                        params: [
                            pickerValue,
                            write,
                            { QnAType: QnAType },
                            { healthType: healthType ? healthType : 'null' },
                        ],
                    });
                }
            }
            if (pickerValue === 'Diary') {
                if (write === '') {
                    Alert.alert('텍스트를 입력해 주세요!');
                } else {
                    const conditionType =
                        typeFirst.current.state.checked === true
                            ? { type: '상' }
                            : typeSecond.current.state.checked === true
                            ? { type: '중' }
                            : typeThird.current.state.checked === true
                            ? { type: '하' }
                            : null;
                    navigation.navigate('MainStack', {
                        screen: 'CreateSelectImg',
                        params: [pickerValue, write, { condition: conditionType }, { significant: significant }],
                    });
                }
            } else if (pickerValue === 'Post') {
                if (write === '') {
                    Alert.alert('텍스트를 입력해 주세요!');
                } else {
                    navigation.navigate('MainStack', {
                        screen: 'CreateSelectImg',
                        params: [pickerValue, write],
                    });
                }
            }
        }

        if (loading) {
            return;
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Box behavior={Platform.select({ ios: 'position', android: 'position' })}>
                    {/* 카테고리 선택은 필수 */}
                    <SelectBox>
                        <RNPickerSelect
                            placeholder={{ label: 'Category', value: '선택' }}
                            onValueChange={(value) => setPickerValue(value)}
                            items={[
                                { label: 'Post', value: 'Post' },
                                { label: 'QnA', value: 'QnA' },
                                { label: 'Diary', value: 'Diary' },
                            ]}
                        >
                            <CategoryBox>
                                <CategoryText> 카테고리를 선택해 주세요. </CategoryText>
                                <SelectedBox>
                                    <SelectedText>{pickerValue ? pickerValue : '선택'}</SelectedText>
                                </SelectedBox>
                            </CategoryBox>
                        </RNPickerSelect>
                    </SelectBox>

                    {pickerValue === 'QnA' && (
                        <CreateQuestionScreen
                            typeHealth={typeHealth}
                            typeLife={typeLife}
                            typeEtc={typeEtc}
                            typeFirst={typeFirst}
                            typeSecond={typeSecond}
                            typeThird={typeThird}
                        />
                    )}
                    {pickerValue === 'Diary' && (
                        <CreateDiaryScreen
                            typeFirst={typeFirst}
                            typeSecond={typeSecond}
                            typeThird={typeThird}
                            significant={significant}
                            setSignificant={setSignificant}
                        />
                    )}

                    {/* 텍스트 입력 필수로 설정 */}
                    {/* 카테고리 선택 후 각자 맞는 세부 사항 체크 후에 텍스트 입력창이 보이도록 수정  */}
                    {pickerValue !== '' && pickerValue !== '선택' && (
                        <WriteBox>
                            <WriteInput
                                value={write}
                                placeholder="Write a note..."
                                placeholderTextColor="grey"
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                maxLength={300}
                                multiline={true}
                                onChangeText={(text) => setWrite(text)}
                            />
                        </WriteBox>
                    )}
                </Box>

                <NextButtonBox>
                    <Button onPress={onSubmitPasswordEditing} write={write}>
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <>
                                <ButtonText>다음</ButtonText>
                                <NextBtton name="keyboard-arrow-right" size={22} color="#f9f9f7" />
                            </>
                        )}
                    </Button>
                </NextButtonBox>
            </Container>
        </TouchableWithoutFeedback>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #f9f9f7;
    align-items: center;
`;

const HeaderBox = styled.View`
    background-color: #f9f9f7;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 10%;
    width: 100%;
    height: 10%;
    z-index: 10;
`;

const Box = styled(KeyboardAvoidingView)`
    width: 100%;
    padding: 20px 20px;
`;

const SelectBox = styled.TouchableOpacity`
    border-width: 1px;
    border-color: #d5d5d4;
    width: 100%;
    padding: 14px;
    border-radius: 12px;
`;

const CategoryBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CategoryText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: #343c3a;
`;

const SelectedBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: rgba(36, 62, 53, 0.8);
    border-radius: 4px;
    padding: 6px 0px;
    width: 60px;
    height: 34px;
`;

const SelectedText = styled.Text`
    color: #d5d5d4;
    /* font-size: 16px; */
    margin: 0px 10px;
`;

const WriteBox = styled.View`
    border-top-width: 1px;
    border-color: #d5d5d4;
    margin-top: 16px;
    border-radius: 12px;
    width: 100%;
    height: 250px;
    padding: 16px;
`;
const WriteInput = styled.TextInput`
    color: #343c3a;
    font-size: 14px;
`;

const NextButtonBox = styled.View`
    width: 90%;
    justify-content: center;
    align-items: center;
    bottom: 30px;
    position: absolute;
`;

const Button = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${({ write }) => (write !== '' ? '#243e35' : '#839891')};
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`;

const ButtonText = styled.Text`
    color: #f9f9f7;
`;

const NextBtton = styled(MaterialIcons)`
    position: absolute;
    right: 20px;
`;

export default CreateAllPostScreen;
