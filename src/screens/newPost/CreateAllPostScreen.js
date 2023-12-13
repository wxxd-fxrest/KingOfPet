import React, { useState } from 'react';
import styled from 'styled-components';
import RNPickerSelect from 'react-native-picker-select';
import { Alert, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CreateQuestionScreen from './CreateQuestionScreen';
import CreateDiaryScreen from './CreateDiaryScreen';

// import { MaterialCommunityIcons } from '@expo/vector-icons';
// <MaterialCommunityIcons name="message-star-outline" size={20} color="#d5d5d4" />
// <MaterialCommunityIcons name="message-question-outline" size={20} color="#d5d5d4" />
// <MaterialCommunityIcons name="message-bookmark-outline" size={20} color="#d5d5d4" />

const CreateAllPostScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [pickerValue, setPickerValue] = useState('');
    const [write, setWrite] = useState('');

    const onSubmitPasswordEditing = async () => {
        if (pickerValue === '' || pickerValue === '선택') {
            Alert.alert('카테고리를 선택해 주세요!');
        } else {
            if (pickerValue === 'Diary' || pickerValue === 'QnA') {
                if (write === '') {
                    Alert.alert('텍스트를 입력해 주세요!');
                } else {
                    navigation.navigate('MainStack', {
                        screen: 'CreateSelectImg',
                        params: [pickerValue, write],
                    });
                }
            } else if (pickerValue === 'Post') {
                navigation.navigate('MainStack', {
                    screen: 'CreateSelectImg',
                    params: [pickerValue, write],
                });
            }
        }

        if (loading) {
            return;
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <HeaderBox>
                    <BackIcon
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                    </BackIcon>
                    <Title>포스트</Title>
                </HeaderBox>
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

                    {/* {pickerValue === 'Post' && <CreateRandomScreen />} */}
                    {pickerValue === 'QnA' && <CreateQuestionScreen />}
                    {pickerValue === 'Diary' && <CreateDiaryScreen />}

                    {/* 텍스트 입력 필수로 설정 */}
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
                                // onSubmitEditing={}
                                onChangeText={(text) => setWrite(text)}
                            />
                        </WriteBox>
                    )}
                    {/* 일기에 경우 내용에 대한 간략한 태그(약 다섯개)필요 */}
                </Box>
                <NextButtonBox>
                    <Button onPress={onSubmitPasswordEditing} pickerValue={pickerValue}>
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
    padding-top: 12%;
    width: 100%;
    height: 10%;
    z-index: 10;
`;

const BackIcon = styled(MaterialIcons)`
    left: 20px;
    position: absolute;
    bottom: 24%;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #343c3a;
`;

const Box = styled(KeyboardAvoidingView)`
    width: 100%;
    padding: 20px 20px;
`;

const SelectBox = styled.TouchableOpacity`
    /* background-color: #d5d5d4; */
    border-width: 1px;
    border-color: #d5d5d4;
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    /* margin-bottom: 16px; */
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
    height: 30px;
`;

const SelectedText = styled.Text`
    color: #d5d5d4;
    /* font-size: 16px; */
    margin: 0px 10px;
`;

const WriteBox = styled.View`
    /* background-color: #d5d5d4; */
    border-width: 1px;
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
    background-color: ${({ pickerValue }) => (pickerValue !== '' && pickerValue !== '선택' ? '#243e35' : '#839891')};
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
