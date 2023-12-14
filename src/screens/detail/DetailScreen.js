import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommentScreen from './CommentScreen';
import { AntDesign } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const DetailScreen = ({ navigation, route: { params } }) => {
    console.log('detail', params);
    const swiperRef = useRef(null);
    const sheetRef = useRef(null);
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

    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <MaterialIcons name="pets" size={24} color="#243e35" />,
        });
    }, [navigation]);

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

                {params.qna_boolen === false ? (
                    <LikeButton>
                        <MaterialIcons name="pets" size={18} color="rgba(249, 19, 0, 0.8)" />
                    </LikeButton>
                ) : (
                    <QnABox>
                        <QnABoolen>Q&A</QnABoolen>
                    </QnABox>
                )}
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
                <UserProfileBox>
                    <UerProfileImageBox
                        onPress={() => {
                            navigation.navigate('MainStack', {
                                screen: 'UserProfile',
                                params: params,
                            });
                        }}
                    >
                        <UserProfileImg source={{ uri: params.image }} />
                    </UerProfileImageBox>
                    <UserProfileNameTag
                        onPress={() => {
                            navigation.navigate('MainStack', {
                                screen: 'UserProfile',
                                params: params,
                            });
                        }}
                    >
                        <UserProfileTitle>옆집 상전</UserProfileTitle>
                        <UserProfileName>{params.username}</UserProfileName>
                    </UserProfileNameTag>
                    <FollowBox>
                        <Follow>Follow</Follow>
                    </FollowBox>
                </UserProfileBox>

                <DetailBox>
                    <Detail>{params.description}</Detail>
                </DetailBox>
            </ScrollView>

            <BottomSheetBox>
                <OpenBottomSheetButton onPress={toggleBottomSheet}>
                    <MaterialCommunityIcons name="comment-outline" size={20} color="#243E35" />
                    <OpenBottomSheetText>Comment</OpenBottomSheetText>
                    <ArrowIcon name="keyboard-arrow-up" size={20} color="#243E35" />
                </OpenBottomSheetButton>
                <Modal
                    propagateSwipe
                    isVisible={isBottomSheetVisible}
                    onBackdropPress={toggleBottomSheet}
                    swipeDirection={['down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <BottomSheetContainer>
                        <CommentScreen toggleBottomSheet={toggleBottomSheet} userData={userData} />
                    </BottomSheetContainer>
                </Modal>
            </BottomSheetBox>
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
    padding-bottom: 70px;
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

const QnABox = styled.View`
    background-color: rgba(193, 204, 200, 0.5);
    color: #fc8980;
    width: 30px;
    height: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

const QnABoolen = styled.Text`
    font-size: 10px;
    color: #243e35;
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

const UserProfileBox = styled.View`
    padding: 0px 20px;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
`;

const UerProfileImageBox = styled.TouchableOpacity``;

const UserProfileImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    margin-right: 16px;
`;

const UserProfileNameTag = styled.TouchableOpacity``;

const UserProfileTitle = styled.Text`
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #343c3a;
`;

const UserProfileName = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: #343c3a;
`;

const FollowBox = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    background-color: rgba(193, 204, 200, 0.2);
    padding: 8px 12px;
    border-radius: 16px;
    border-width: 1px;
    border-color: #243e35;
`;

const Follow = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: #243e35;
`;

const DetailBox = styled.View`
    padding: 10px 20px;
`;

const Detail = styled.Text`
    color: #343c3a;
    font-size: 14px;
    font-weight: 400;
`;

const BottomSheetBox = styled.View`
    background-color: #f9f9f7;
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0px;
    justify-content: center;
    align-items: center;
`;

const OpenBottomSheetButton = styled.TouchableOpacity`
    background-color: #c1ccc8;
    padding: 0px 20px;
    border-radius: 16px;
    width: 90%;
    height: 60%;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: row;
`;

const OpenBottomSheetText = styled.Text`
    color: #243e35;
    font-size: 12px;
    font-weight: 600;
    margin-left: 10px;
`;

const ArrowIcon = styled(MaterialIcons)`
    position: absolute;
    right: 20px;
`;

const BottomSheetContainer = styled.View`
    background-color: #f9f9f7;
    padding: 14px 20px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    height: 84%;
`;

export default DetailScreen;
