import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import ComentScreen from '../comment/ComentScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import EmptyImg from '../../assets/logo.png';
import FollowButton from '../../components/FollowButton';

const DetailScreen = ({ navigation, route: { params } }) => {
    let detailData;
    let detailDocID;
    if (params) {
        detailData = params.Data;
        detailDocID = params.DocID;
    }

    // console.log('detailData', detailDocID);

    const swiperRef = useRef(null);
    const sheetRef = useRef(null);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentUserData, setCurrentUserData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        // console.log('profile', currentUser);

        firestore()
            .collection('Users')
            .doc(`${currentUser.email}`)
            .onSnapshot((documentSnapshot) => {
                setCurrentUserData(documentSnapshot.data());
                console.log('디테일 페이지 current 유저 데이터: ', documentSnapshot.data());
            });

        firestore()
            .collection('Users')
            .doc(`${detailData.useremail}`)
            .onSnapshot((documentSnapshot) => {
                setUserData(documentSnapshot.data());
                console.log('detailData', documentSnapshot.data());
            });
    }, [currentUser]);

    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };

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

                {detailData.type === 'Post' ? (
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
                        {detailData.image.map((item, i) => (
                            <BannerContainer key={i} activeOpacity={0.9}>
                                <BannerImage source={{ uri: item.url || EmptyImg }} />
                            </BannerContainer>
                        ))}
                    </Swiper>
                </SwiperBox>
                <UserProfileBox>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            <>
                                {currentUser.email === userData.email
                                    ? navigation.navigate('MainTab', {
                                          screen: 'MyProfile',
                                      })
                                    : navigation.navigate('MainStack', {
                                          screen: 'UserProfile',
                                          params: userData,
                                      })}
                            </>;
                        }}
                    >
                        <UerProfileImageBox>
                            <UserProfileImg source={{ uri: userData.petimage }} />
                        </UerProfileImageBox>
                        <UserProfileNameTag>
                            <UserProfileTitle>옆집 상전</UserProfileTitle>
                            <UserProfileName>{userData.petname}</UserProfileName>
                        </UserProfileNameTag>
                    </TouchableOpacity>
                    <FollowButton
                        follow={follow}
                        setFollow={setFollow}
                        currentUserData={currentUserData}
                        userData={userData}
                    />
                </UserProfileBox>

                <DetailBox>
                    <Detail
                        style={{
                            backgroundColor: 'tomato',
                        }}
                    >
                        {detailData.type}
                    </Detail>
                    <Detail>{detailData.text}</Detail>
                </DetailBox>
            </ScrollView>

            <BottomSheetBox>
                <OpenBottomSheetButton onPress={toggleBottomSheet}>
                    <MaterialCommunityIcons name="comment-outline" size={20} color="#f9f9f7" />
                    <OpenBottomSheetText>Comment</OpenBottomSheetText>
                    <ArrowIcon name="keyboard-arrow-up" size={20} color="#f9f9f7" />
                </OpenBottomSheetButton>
                <Modal
                    propagateSwipe
                    isVisible={isBottomSheetVisible}
                    onBackdropPress={toggleBottomSheet}
                    swipeDirection={['down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <BottomSheetContainer>
                        <ComentScreen
                            toggleBottomSheet={toggleBottomSheet}
                            detailDocID={detailDocID}
                            userData={userData}
                        />
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

const BannerContainer = styled.View`
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

const UerProfileImageBox = styled.View``;

const UserProfileImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    margin-right: 16px;
`;

const UserProfileNameTag = styled.View``;

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

const DetailBox = styled.View`
    padding: 10px 20px;
    margin-top: 3%;
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
    background-color: #243e35;
    padding: 0px 20px;
    border-radius: 16px;
    width: 90%;
    height: 50%;
    margin-bottom: 24px;
    align-items: center;
    flex-direction: row;
`;

const OpenBottomSheetText = styled.Text`
    color: #f9f9f7;
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
