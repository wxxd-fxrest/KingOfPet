import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const DiaryDetailScreen = ({ navigation, route: { params } }) => {
    console.log('detail', params);
    const swiperRef = useRef(null);
    const sheetRef = useRef(null);

    const [star, setStar] = useState(true);
    const [currentUser, setCurrentUser] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        // console.log('profile', currentUser);
        firestore()
            .collection('Users')
            .doc(`${currentUser.email}`)
            .onSnapshot((documentSnapshot) => {
                setUserData(documentSnapshot.data());
                console.log('profile User data: ', documentSnapshot.data());
            });
    }, [currentUser]);

    return (
        <Container>
            <HeaderIconBox>
                {Platform.OS === 'ios' ? (
                    <BackButton
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                    </BackButton>
                ) : (
                    <BackButton
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <AntDesign name="arrowleft" size={22} color="#243e35" />
                    </BackButton>
                )}

                <LikeButton>
                    <MaterialCommunityIcons
                        name={star === true ? 'star-check' : 'star-plus-outline'}
                        size={18}
                        color="#243e35"
                    />
                </LikeButton>
            </HeaderIconBox>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SwiperBox>
                    <Swiper
                        ref={swiperRef}
                        loop
                        timeout={2}
                        controlsEnabled={false}
                        dot={
                            <View
                                style={{
                                    backgroundColor: '#c1ccc8',
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3,
                                }}
                            />
                        }
                        activeDot={
                            <View
                                style={{
                                    backgroundColor: '#243e35',
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3,
                                }}
                            />
                        }
                    >
                        {params.images.map((item, i) => (
                            <BannerContainer
                                key={i}
                                activeOpacity={0.9}
                                onPress={() => {
                                    navigation.navigate('NovelStack', { screen: 'NovelIndex', params: item });
                                }}
                            >
                                <BannerImage source={{ uri: item }} />
                            </BannerContainer>
                        ))}
                    </Swiper>
                </SwiperBox>

                <PetMoodContainer>
                    <PetImageBox>
                        <PetImg source={{ uri: params.image }} />
                    </PetImageBox>
                    <PetMoodBox>
                        <DiaryDateBox>
                            <MaterialCommunityIcons name="calendar-heart" size={14} color="#243e35" />
                            <DiayrDate>2023.02.31</DiayrDate>
                        </DiaryDateBox>
                        <PetNameTag>
                            {/* <UserProfileTitle>상전 </UserProfileTitle> */}
                            <PetName>{params.username}</PetName>
                            <PetMoodText> 컨디션 최고!</PetMoodText>
                        </PetNameTag>
                    </PetMoodBox>
                </PetMoodContainer>

                <SetSignificantBox>
                    <SetSignificantTitle>특이사항: </SetSignificantTitle>
                    <SetSignificant>
                        잘 놀고 잘 자고 주인을 잘 괴롭힘잘 놀고 잘 자고 주인을 잘 괴롭힘잘 놀고 잘 자고 주인을 잘
                        괴롭힘잘 놀고 잘 자고 주인을 잘 괴롭힘
                    </SetSignificant>
                </SetSignificantBox>

                <DetailBox>
                    <Detail>{params.description}</Detail>
                </DetailBox>
            </ScrollView>
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
`;

const HeaderIconBox = styled.View`
    flex-direction: row;
    position: absolute;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    top: 50px;
    z-index: 10;
    padding: 0px 20px;
`;

const LikeButton = styled.TouchableOpacity`
    background-color: rgba(193, 204, 200, 0.2);
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
`;

const BackButton = styled.TouchableOpacity``;

const SwiperBox = styled.View`
    position: relative;
    height: 400px;
    ${Platform.OS === 'android' ? 'elevation: 4;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.2; shadow-radius: 4px;'
        : ''}
`;

const BannerContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

const BannerImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 16px;
`;

const PetMoodContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: rgba(36, 62, 53, 0.4);
    margin: 20px 20px;
    margin-bottom: 10px;
    padding: 20px 20px;
    border-radius: 12px;
`;

const DiaryDateBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 6px;
`;

const DiayrDate = styled.Text`
    color: #343c3a;
    margin-left: 4px;
    font-size: 12px;
`;

const PetMoodBox = styled.View`
    justify-content: center;
`;

const PetImageBox = styled.TouchableOpacity`
    margin-right: 16px;
`;

const PetImg = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
`;

const PetNameTag = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const PetMoodText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: #343c3a;
`;

const PetName = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #343c3a;
`;

const SetSignificantBox = styled.View`
    margin: 0px 20px;
    padding: 10px 20px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 10px;
`;

const SetSignificantTitle = styled.Text`
    font-size: 12px;
    font-weight: 600;
    color: rgba(249, 19, 0, 0.7);
    width: 16%;
`;

const SetSignificant = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: #343c3a;
    width: 84%;
`;

const DetailBox = styled.View`
    padding: 0px 20px;
    padding-bottom: 40px;
`;

const Detail = styled.Text`
    color: #343c3a;
    font-size: 14px;
    font-weight: 400;
`;

export default DiaryDetailScreen;
