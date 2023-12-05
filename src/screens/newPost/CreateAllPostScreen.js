import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

// import { MaterialCommunityIcons } from '@expo/vector-icons';
// <MaterialCommunityIcons name="message-star-outline" size={20} color="#d5d5d4" />
// <MaterialCommunityIcons name="message-question-outline" size={20} color="#d5d5d4" />
// <MaterialCommunityIcons name="message-bookmark-outline" size={20} color="#d5d5d4" />

const CreateAllPostScreen = () => {
    const [loading, setLoading] = useState(false);
    const [pickerValue, setPickerValue] = useState('');
    const [write, setWrite] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [saveImgUrl, setSaveImgUrl] = useState('');

    useEffect(() => {
        const uploadImage = async () => {
            if (!imageUrl) return;

            // 이미지 업로드 로직
            setLoading(true);
            try {
                const asset = imageUrl.assets[0];
                const reference = storage().ref(`/profile/${asset.fileName}`);
                await reference.putFile(asset.uri);
                const IMG_URL = await reference.getDownloadURL();
                // console.log('IMG_URL', IMG_URL);
                setSaveImgUrl(IMG_URL);
                setImageUrl('');
                // console.log('imageUrl', imageUrl);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };

        uploadImage(); // 이미지 업로드 실행
    }, [imageUrl]); // imageUrl이 변경될 때마다 실행

    const handleImagePick = async () => {
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                // 권한이 거부된 경우에 대한 처리 로직
                console.log('권한이 거부되었습니다.');
                return;
            }
        }

        // 이미지 선택 로직
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1],
        });

        // console.log('result', result);
        setImageUrl(result);
    };

    return (
        <Container onPress={() => keyboard.dismiss()}>
            {/* 이미지 캐러셀 필요 */}
            {/* 자랑, 일기에 경우 이미지 필수 */}
            {/* 질문에 경우 선택 */}
            {/* 이미지 최대 다섯 장 제한 */}
            {/* 첫 이미지 선택 시 아이콘은 카메라이지만 이후 부터는 플러스 아이콘으로 변경 */}
            <ImageContainer>
                <ImageSelectBox activeOpacity={0.6} onPress={handleImagePick}>
                    {saveImgUrl ? (
                        <PreviewBox>
                            <PreviewImage source={saveImgUrl && { uri: saveImgUrl }} />
                            <DeleteImageBtn
                                activeOpacity={0.6}
                                onPress={() => {
                                    setSaveImgUrl('');
                                }}
                            >
                                <Feather name="x-circle" size={22} color="#243e35" />
                            </DeleteImageBtn>
                        </PreviewBox>
                    ) : (
                        <PreviewBox>
                            <Feather name="camera" size={24} color="#243e35" />
                        </PreviewBox>
                    )}
                </ImageSelectBox>
            </ImageContainer>

            {/* 카테고리 선택은 필수 */}
            <SelectBox>
                <RNPickerSelect
                    placeholder={{ label: 'Category', value: null }}
                    onValueChange={(value) => setPickerValue(value)}
                    items={[
                        { label: 'Post', value: 'Post' },
                        { label: 'QnA', value: 'QnA' },
                        { label: 'Diary', value: 'Diary' },
                    ]}
                >
                    <CategoryBox>
                        <CategoryText> Category </CategoryText>
                        <SelectedBox>
                            <SelectedText>{pickerValue ? pickerValue : 'select'}</SelectedText>
                        </SelectedBox>
                    </CategoryBox>
                </RNPickerSelect>
            </SelectBox>

            {/* 텍스트 입력 필수로 설정 */}
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
            {/* 일기에 경우 내용에 대한 간략한 태그(약 다섯개)필요 */}
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #f9f9f7;
    padding: 10px 20px;
`;

const ImageContainer = styled.View`
    width: 100%;
    align-items: center;
`;

const ImageSelectBox = styled.TouchableOpacity`
    background-color: #d5d5d4;
    width: 50%;
    height: 260px;
    border-radius: 12px;
    margin-bottom: 20px;
`;

const PreviewBox = styled.View`
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const PreviewImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

const DeleteImageBtn = styled.TouchableOpacity`
    position: absolute;
    z-index: 1;
    top: 8px;
    right: 8px;
`;

const SelectBox = styled.TouchableOpacity`
    background-color: #d5d5d4;
    padding: 14px;
    border-radius: 12px;
`;

const CategoryBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CategoryText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: #343c3a;
`;

const SelectedBox = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: rgba(36, 62, 53, 0.8);
    border-radius: 4px;
    padding: 6px;
`;

const SelectedText = styled.Text`
    color: #d5d5d4;
    font-size: 14px;
    font-weight: 600;
    margin-left: 4px;
`;

const WriteBox = styled.View`
    background-color: #d5d5d4;
    margin-top: 16px;
    border-radius: 12px;
    height: 30%;
    padding: 16px;
`;
const WriteInput = styled.TextInput`
    color: #343c3a;
    font-size: 14px;
`;

export default CreateAllPostScreen;
