import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { styled } from 'styled-components';
import { Feather } from '@expo/vector-icons';

const SocialLoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [petName, setPetName] = useState('');

    const [dog, setDog] = useState(true);
    const [cat, setCat] = useState(false);
    const [different, setDifferent] = useState(false);
    const [petType, setPetType] = useState('');

    const typeDog = useRef();
    const typeCat = useRef();
    const typeDifferent = useRef();

    const [imageUrl, setImageUrl] = useState('');
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [saveImgUrl, setSaveImgUrl] = useState('');

    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        console.log('logot', currentUser);
    }, [currentUser]);

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

    const onSubmitPasswordEditing = async () => {
        if (loading) {
            return;
        }
        const petTypeData =
            typeDog.current.state.checked === true
                ? { type: '강아지' }
                : typeCat.current.state.checked === true
                ? { type: '고양이' }
                : typeDifferent.current.state.checked === true && petType
                ? { type: petType }
                : null;

        if (petTypeData && petName && saveImgUrl) {
            firestore()
                .collection('Users')
                .doc(`${currentUser.email}`)
                .update({
                    petname: petName,
                    petimage: saveImgUrl,
                    ...petTypeData,
                    createprofile: true,
                    signType: 'Email',
                })
                .then(() => {
                    console.log('User added!');
                });
            navigation.goBack();
            Alert.alert('프로필이 완성되었습니다!');
        } else {
            Alert.alert('빈칸을 모두 채워주세요!');
        }
    };
    return (
        <Container onPress={() => keyboard.dismiss()}>
            <ScrollView>
                <TextInputTitle>반려동물을 소개해 주세요!</TextInputTitle>
                <PetInfoContainer>
                    <PetInfoBox>
                        <PetInputTitle>사진을 선택해 주세요.</PetInputTitle>
                        <PetImageSelectBox activeOpacity={0.6} onPress={handleImagePick}>
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
                                    <Feather name="camera" size={24} color="#86918d" />
                                </PreviewBox>
                            )}
                        </PetImageSelectBox>
                    </PetInfoBox>
                    <PetInfoBox>
                        <PetInputTitle>이름을 알려주세요.</PetInputTitle>
                        <PetNameInputBox>
                            <PetNameTextInput
                                value={petName}
                                placeholder="Pet Name"
                                placeholderTextColor="grey"
                                keyboardType="default"
                                returnKeyType="done"
                                onSubmitEditing={onSubmitPasswordEditing}
                                onChangeText={(text) => {
                                    setPetName(text);
                                }}
                            />
                            <DeletePetNameBtn
                                activeOpacity={0.6}
                                onPress={() => {
                                    setPetName('');
                                }}
                            >
                                <Feather name="x-circle" size={24} color="#86918d" />
                            </DeletePetNameBtn>
                        </PetNameInputBox>
                        <PetInputTitle>종을 선택해 주세요.</PetInputTitle>
                        <PetCheckBox
                            size={20}
                            fillColor="#243e35"
                            unfillColor="#f9f9f7"
                            text="강아지"
                            ref={typeDog}
                            isChecked={dog}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{
                                textDecorationLine: 'none',
                            }}
                            onPress={() => {
                                if (typeDog.current.state.checked === true) {
                                    if (typeCat.current.state.checked === true) {
                                        typeCat.current.onPress();
                                    }
                                    if (typeDifferent.current.state.checked === true) {
                                        typeDifferent.current.onPress();
                                        setDifferent(false);
                                    }
                                    setDog(!dog);
                                }
                                console.log(typeDog.current.state.checked);
                            }}
                        />
                        <PetCheckBox
                            size={20}
                            fillColor="#243e35"
                            unfillColor="#f9f9f7"
                            text="고양이"
                            ref={typeCat}
                            isChecked={cat}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{
                                textDecorationLine: 'none',
                            }}
                            onPress={() => {
                                if (typeCat.current.state.checked === true) {
                                    if (typeDog.current.state.checked === true) {
                                        typeDog.current.onPress();
                                    }
                                    if (typeDifferent.current.state.checked === true) {
                                        typeDifferent.current.onPress();
                                        setDifferent(false);
                                    }
                                    setCat(!dog);
                                }
                            }}
                        />
                        <PetCheckBox
                            size={20}
                            fillColor="#243e35"
                            unfillColor="#f9f9f7"
                            text="기타"
                            ref={typeDifferent}
                            isChecked={different}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{
                                textDecorationLine: 'none',
                            }}
                            onPress={() => {
                                if (typeDifferent.current.state.checked === true) {
                                    if (typeDog.current.state.checked === true) {
                                        typeDog.current.onPress();
                                    }
                                    if (typeCat.current.state.checked === true) {
                                        typeCat.current.onPress();
                                    }
                                    setDifferent(!different);
                                }
                            }}
                        />
                        {different === true && (
                            <Animatable.View animation="fadeInUp" duration={600}>
                                <PetInputTitle>반려동물의 종을 입력해 주세요.</PetInputTitle>
                                <PetNameInputBox>
                                    <PetNameTextInput
                                        value={petType}
                                        keyboardType="default"
                                        placeholder="Pet Type"
                                        placeholderTextColor="grey"
                                        returnKeyType="done"
                                        onSubmitEditing={onSubmitPasswordEditing}
                                        onChangeText={(text) => {
                                            setPetType(text);
                                        }}
                                    />
                                    <DeletePetNameBtn
                                        activeOpacity={0.6}
                                        onPress={() => {
                                            setPetType('');
                                        }}
                                    >
                                        <Feather name="x-circle" size={24} color="#86918d" />
                                    </DeletePetNameBtn>
                                </PetNameInputBox>
                            </Animatable.View>
                        )}
                    </PetInfoBox>
                </PetInfoContainer>
            </ScrollView>

            <JoinButton>
                <Button onPress={onSubmitPasswordEditing}>
                    {loading ? <ActivityIndicator color="white" /> : <ButtonText> 프로필 완성하기 </ButtonText>}
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

const DeletePetNameBtn = styled.TouchableOpacity`
    position: absolute;
    right: 5%;
    z-index: 1;
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

export default SocialLoginScreen;
