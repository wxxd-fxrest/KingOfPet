import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { View } from 'react-native';

const DetailScreen = ({ navigation, route: { params } }) => {
    console.log(params);
    const swiperRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <MaterialIcons name="pets" size={24} color="#243e35" />,
        });
    }, [navigation]);

    return (
        <Container showsVerticalScrollIndicator={false}>
            <HeaderIconBox>
                <BackButton>
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={22}
                        color="#0e1815"
                        onPress={() => navigation.goBack()}
                    />
                </BackButton>
                <LikeButton>
                    <MaterialIcons name="pets" size={18} color="rgba(249, 19, 0, 0.8)" />
                </LikeButton>
            </HeaderIconBox>

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
                <UerProfileImageBox>
                    <UserProfileImg source={{ uri: params.image }} />
                </UerProfileImageBox>
                <UserProfileNameTag>
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
        </Container>
    );
};

const Container = styled.ScrollView`
    background-color: #f9f9f7;
    flex: 1;
    /* padding: 10px 20px; */
`;

const HeaderIconBox = styled.View`
    flex-direction: row;
    position: absolute;
    justify-content: space-between;
    width: 100%;
    top: 50px;
    z-index: 10;
    padding: 0px 20px;
    /* left: 20px;
    top: 50px; */
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

const UserProfileBox = styled.View`
    /* background-color: yellowgreen; */
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

const FollowBox = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    background-color: rgba(193, 204, 200, 0.2);
    padding: 8px 12px;
    border-radius: 16px;
    border-width: 1px;
    border-color: #929f9a;
`;

const Follow = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: #343c3a;
`;

const DetailBox = styled.View`
    /* background-color: yellow; */
    padding: 10px 20px;
`;

const Detail = styled.Text`
    color: #343c3a;
    font-size: 14px;
    font-weight: 400;
`;

export default DetailScreen;
