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
import LikeButton from '../../components/LikeButton';
import LinearGradient from 'react-native-linear-gradient';
import MoreButton from '../../components/MoreButton';

const DetailScreen = ({ navigation, route: { params } }) => {
    let detailDocID;
    let detailData;

    if (params) {
        detailData = params.Data;
        detailDocID = params.DocID;
    }

    let postDate = detailData.orderBy;
    let date = postDate.split(' ');
    let newDate = date[1] + ' ' + date[2] + ' ' + date[3] + ' ' + date[4];
    // console.log(newDate);

    console.log('디테일', detailData);

    const swiperRef = useRef(null);
    const sheetRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(auth().currentUser);
    const [currentUserData, setCurrentUserData] = useState({});
    const [userData, setUserData] = useState({});
    const [follow, setFollow] = useState(false);

    useEffect(() => {
        const userDoc = firestore().collection('Users').doc(currentUser.email);

        const userUnsubscribe = userDoc.onSnapshot((userSnapshot) => {
            setCurrentUserData(userSnapshot.data());
        });

        return () => {
            userUnsubscribe();
        };
    }, [currentUser, detailDocID, currentUserData.follow]);

    useEffect(() => {
        if (detailData.useremail) {
            const userDoc = firestore().collection('Users').doc(detailData.useremail);

            const userUnsubscribe = userDoc.onSnapshot((userSnapshot) => {
                setUserData(userSnapshot.data());
            });

            return () => {
                userUnsubscribe();
            };
        }
    }, [detailData.useremail]);

    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };

    const isFollowing = Array.isArray(currentUserData.following) && currentUserData.following.includes(userData.email);

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
                    <LikeButton currentUser={currentUser} currentUserData={currentUserData} detailDocID={detailDocID} />
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
                                    marginBottom: 0,
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
                                    marginBottom: 1.8,
                                }}
                            />
                        }
                    >
                        {detailData.image.map((item, i) => {
                            return (
                                <>
                                    {detailData && detailData.image ? (
                                        <>
                                            <BannerContainer key={i} activeOpacity={0.9}>
                                                <LinearGradientBox
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 0, y: 1 }}
                                                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
                                                    style={{
                                                        width: '100%',
                                                        height: '14%',
                                                    }}
                                                />

                                                <BannerImage source={{ uri: item.url } || EmptyImg} />
                                                {detailData.type === 'Post' ? (
                                                    <DetailTypeBox>
                                                        <DetailType>{detailData.type}</DetailType>
                                                    </DetailTypeBox>
                                                ) : (
                                                    <>
                                                        {detailData.QnAType.type !== '건강' ? (
                                                            <DetailTypeBox>
                                                                <DetailType>{detailData.QnAType.type}</DetailType>
                                                            </DetailTypeBox>
                                                        ) : (
                                                            <>
                                                                <DetailTypeBox
                                                                    style={{
                                                                        backgroundColor: 'rgba(249, 19, 0, 0.8)',
                                                                    }}
                                                                >
                                                                    <DetailType>{detailData.QnAType.type}</DetailType>
                                                                </DetailTypeBox>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                                <OrderByBox>
                                                    <OrderByText>{newDate}</OrderByText>
                                                </OrderByBox>
                                            </BannerContainer>
                                        </>
                                    ) : null}
                                </>
                            );
                        })}
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
                            <UserProfileImg source={{ uri: userData.petimage } || EmptyImg} />
                        </UerProfileImageBox>
                        <UserProfileNameTag>
                            <UserProfileTitle>옆집 상전</UserProfileTitle>
                            <UserProfileName>{userData.petname}</UserProfileName>
                        </UserProfileNameTag>
                    </TouchableOpacity>
                    {userData.email === currentUser.email ? (
                        <MoreButton detailDocID={detailDocID} navigation={navigation} />
                    ) : (
                        <FollowButton isFollowing={isFollowing} currentUserData={currentUserData} userData={userData} />
                    )}
                </UserProfileBox>

                {detailData.type === 'QnA' && detailData.QnAType.type === '건강' && (
                    <HealthBox>
                        <HealthText>건강 관련 질문입니다.</HealthText>
                    </HealthBox>
                )}
                <DetailBox>
                    <Detail>{detailData.text}</Detail>
                </DetailBox>
            </ScrollView>

            <BottomSheetBox>
                <OpenBottomSheetButton onPress={toggleBottomSheet}>
                    <MaterialCommunityIcons name="comment-outline" size={20} color="#f9f9f7" />
                    <OpenBottomSheetText>Comment</OpenBottomSheetText>
                    <ArrowIcon name="keyboard-arrow-up" size={24} color="#f9f9f7" />
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

const LinearGradientBox = styled(LinearGradient)`
    position: absolute;
    bottom: 0px;
    z-index: 1;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
`;

const BannerImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 16px;
`;

const OrderByBox = styled.View`
    position: absolute;
    left: 20px;
    bottom: 14px;
    z-index: 100;
`;

const OrderByText = styled.Text`
    margin-bottom: 4px;
    font-size: 10px;
    font-weight: 400;
    color: #d5d5d4;
`;

const DetailTypeBox = styled.View`
    background-color: rgba(193, 204, 200, 0.3);
    position: absolute;
    right: 20px;
    bottom: 14px;
    z-index: 100;
    height: 20px;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
    padding: 4px 6px;
    border-radius: 4px;
`;

const DetailType = styled.Text`
    font-size: 10px;
    font-weight: 400;
    color: #d5d5d4;
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

const HealthBox = styled.View`
    background-color: rgba(249, 19, 0, 0.7);
    padding: 8px 20px;
    margin-top: 16px;
`;

const HealthText = styled.Text`
    color: #f9f9f7;
    font-size: 14px;
    font-weight: 400;
`;

const DetailBox = styled.View`
    padding: 10px 20px;
    margin-top: 8px;
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
    height: 50px;
    margin-bottom: 24px;
    align-items: center;
    flex-direction: row;
`;

const OpenBottomSheetText = styled.Text`
    color: #f9f9f7;
    font-size: 14px;
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
