import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const CreateSelectImgScreen = ({ navigation, route: params }) => {
    console.log('category', params);

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [saveImgUrl, setSaveImgUrl] = useState('');

    const [totalImg, setTotalImg] = useState([
        {
            id: 'select',
            url: '',
        },
    ]);

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
                setTotalImg([{ id: asset.assetId, url: IMG_URL }, ...totalImg]);
                console.log(totalImg);
                setImageUrl('');
                // console.log('imageUrl', imageUrl);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
        console.log(totalImg);

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

        console.log('result', result);
        setImageUrl(result);
    };

    const data = [{ image: '' }];

    const onMaxImgAlert = () => {
        Alert.alert('최대 다섯장의 사진을 모두 선택했습니다.');
    };

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <ImageContainer>
                <ImageSelectBox activeOpacity={0.6}>
                    {totalImg.length > 1 ? (
                        <>
                            {item.id === 'select' ? (
                                <PreviewBox onPress={totalImg.length >= 6 ? onMaxImgAlert : handleImagePick}>
                                    {loading ? (
                                        <ActivityIndicator color="#243e35" />
                                    ) : (
                                        <AntDesign
                                            name="plus"
                                            size={26}
                                            color={totalImg.length >= 6 ? '#BDBDBD' : '#243e35'}
                                        />
                                    )}
                                </PreviewBox>
                            ) : (
                                <PreviewBox>
                                    <PreviewImage source={item && { uri: item.url }} />
                                    <DeleteImageBtn
                                        activeOpacity={0.6}
                                        onPress={() => {
                                            let itemID = item.id;
                                            const updatedTotalImg = totalImg.filter((item) => item.id !== itemID);
                                            setTotalImg(updatedTotalImg);
                                        }}
                                    >
                                        <Feather name="x-circle" size={22} color="#243e35" />
                                    </DeleteImageBtn>
                                </PreviewBox>
                            )}
                        </>
                    ) : (
                        <PreviewBox onPress={handleImagePick}>
                            {loading ? (
                                <ActivityIndicator color="#243e35" />
                            ) : (
                                <Feather name="camera" size={24} color="#243e35" />
                            )}
                        </PreviewBox>
                    )}
                </ImageSelectBox>
            </ImageContainer>
        );
    };

    const onSubmitPasswordEditing = async () => {
        if (loading) {
            return;
        }
    };

    return (
        <Container>
            {/* 이미지 캐러셀 필요 */}
            {/* 자랑, 일기에 경우 이미지 필수 */}
            {/* 질문에 경우 선택 */}
            {/* 이미지 최대 다섯 장 제한 */}
            {/* 첫 이미지 선택 시 아이콘은 카메라이지만 이후 부터는 플러스 아이콘으로 변경 */}
            <Box>
                <CarouselBox>
                    <Carousel
                        layout={'default'}
                        sliderWidth={300}
                        sliderHeight={300}
                        itemWidth={250}
                        data={totalImg.length > 1 ? totalImg : data}
                        renderItem={renderItem}
                    />
                </CarouselBox>
            </Box>
            <NextButtonBox>
                <ImgSelectText> 최대 다섯장의 사진을 선택해 주세요. </ImgSelectText>
                <Button onPress={onSubmitPasswordEditing}>
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <ButtonText> 다음 </ButtonText>
                            <NextBtton name="keyboard-arrow-right" size={22} color="#f9f9f7" />
                        </>
                    )}
                </Button>
            </NextButtonBox>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #f9f9f7;
    align-items: center;
`;

const Box = styled.View`
    width: 90%;
    height: 80%;
    align-items: center;
`;

const CarouselBox = styled.View`
    margin-top: 10%;
    height: 300px;
    align-items: center;
`;

const ImgSelectText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: #343c3a;
    padding-bottom: 12px;
`;

const ImageContainer = styled.View`
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ImageSelectBox = styled.View`
    background-color: #d5d5d4;
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

const PreviewBox = styled.TouchableOpacity`
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

const NextButtonBox = styled.View`
    width: 90%;
    justify-content: center;
    align-items: center;
    bottom: 30px;
    position: absolute;
`;

const Button = styled.TouchableOpacity`
    flex-direction: row;
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

const NextBtton = styled(MaterialIcons)`
    position: absolute;
    right: 20px;
`;

export default CreateSelectImgScreen;
