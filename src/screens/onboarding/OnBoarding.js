import React, { useRef } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import styled from 'styled-components';
import EmptyImg from '../../assets/logo.png';
import BoardingData from '../../data/BoardingData';
import { MaterialIcons } from '@expo/vector-icons';

const OnBoarding = ({ handleOnBoardingSeen }) => {
    const swiperRef = useRef(null);

    return (
        <Container>
            <StartButton onPress={handleOnBoardingSeen}>
                <Start>시작하기</Start>
            </StartButton>
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
                                marginBottom: '-40%',
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
                                marginBottom: '-39%',
                            }}
                        />
                    }
                >
                    {BoardingData.map((item, i) => {
                        return (
                            <View key={i}>
                                <BannerContainer activeOpacity={0.9}>
                                    <LinearGradientBox
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.4)']}
                                        style={{
                                            width: '80%',
                                            height: '100%',
                                        }}
                                    />
                                    {item.id === '1' && (
                                        <DiaryCheckBox>
                                            <Bar />
                                            <DiaryIconBox>
                                                <MaterialIcons name="pets" size={24} color="#f9f9f7" />
                                            </DiaryIconBox>
                                            <DiaryInfo>최초 가입 시 일기장은 비공개로 설정되어 있으며,</DiaryInfo>
                                            <DiaryInfo>프로필 수정 화면에서 변경하실 수 있습니다.</DiaryInfo>
                                        </DiaryCheckBox>
                                    )}
                                    {item.id === '2' && (
                                        <PostCreateBox>
                                            <Circle />
                                            <PostIconBox>
                                                <MaterialIcons name="pets" size={24} color="#f9f9f7" />
                                            </PostIconBox>
                                            <PostCreateInfo>
                                                포스트 카테고리 선택 후 글을 작성할 수 있습니다.
                                            </PostCreateInfo>
                                        </PostCreateBox>
                                    )}
                                    {item.id === '3' && (
                                        <QnAInfoBox>
                                            <QnAIconBox>
                                                <MaterialIcons name="pets" size={24} color="#f9f9f7" />
                                            </QnAIconBox>
                                            <QnAInfo>건강 관련 질문에 경우 별도 표시를 확인할 수 있습니다.</QnAInfo>
                                        </QnAInfoBox>
                                    )}
                                    <BannerImage source={(item && { uri: item.image }) || EmptyImg} />
                                </BannerContainer>
                            </View>
                        );
                    })}
                </Swiper>
            </SwiperBox>
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    align-items: center;
    flex: 1;
`;

const StartButton = styled.TouchableOpacity`
    background-color: rgba(36, 62, 53, 0.8);
    position: absolute;
    top: 60px;
    right: 12px;
    z-index: 100;
    padding: 12px;
    border-radius: 8px;
`;

const Start = styled.Text`
    color: #f9f9f7;
    font-size: 12px;
    font-weight: 600;
`;

const SwiperBox = styled.View`
    position: relative;
    margin-top: 30%;
    width: 100%;
    height: 74%;
`;

const BannerContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

const DiaryCheckBox = styled.View`
    background-color: #f9f9f7;
    padding: 12px;
    border-radius: 12px;
    position: absolute;
    top: 44%;
    right: 12px;
    z-index: 300;
    ${Platform.OS === 'android' ? 'elevation: 4;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 3px; shadow-opacity: 0.4; shadow-radius: 2px;'
        : ''}
`;

const Bar = styled.View`
    width: 70px;
    height: 1.6px;
    background-color: #f91300;
    position: absolute;
    top: -12px;
    right: 105px;
`;

const DiaryIconBox = styled.View`
    position: absolute;
    top: -18px;
    left: -16px;
    background-color: #f75445;
    border-radius: 100px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    ${Platform.OS === 'android' ? 'elevation: 4;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 3px; shadow-opacity: 0.4; shadow-radius: 2px;'
        : ''}
`;

const DiaryInfo = styled.Text`
    font-size: 12px;
    color: #243e35;
`;

const PostCreateBox = styled.View`
    background-color: #f9f9f7;
    padding: 12px;
    border-radius: 12px;
    position: absolute;
    top: 20%;
    right: 12px;
    z-index: 300;
    ${Platform.OS === 'android' ? 'elevation: 4;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 3px; shadow-opacity: 0.4; shadow-radius: 2px;'
        : ''}
`;

const Circle = styled.View`
    width: 70px;
    height: 42px;
    border-radius: 2px;
    border-color: #f91300;
    border-width: 1px;
    position: absolute;
    top: -68px;
    right: 44px;
`;

const PostIconBox = styled.View`
    position: absolute;
    top: -18px;
    left: -16px;
    background-color: #f75445;
    border-radius: 100px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    ${Platform.OS === 'android' ? 'elevation: 4;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 3px; shadow-opacity: 0.4; shadow-radius: 2px;'
        : ''}
`;

const PostCreateInfo = styled.Text`
    font-size: 12px;
    color: #243e35;
`;

const QnAInfoBox = styled.View`
    background-color: #f9f9f7;
    padding: 12px;
    border-radius: 12px;
    position: absolute;
    top: 62%;
    left: 60px;
    z-index: 300;
    ${Platform.OS === 'android' ? 'elevation: 4;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 3px; shadow-opacity: 0.4; shadow-radius: 2px;'
        : ''}
`;

const QnAIconBox = styled.View`
    position: absolute;
    top: -18px;
    left: -16px;
    background-color: #f75445;
    border-radius: 100px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    ${Platform.OS === 'android' ? 'elevation: 4;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 3px; shadow-opacity: 0.4; shadow-radius: 2px;'
        : ''}
`;

const QnAInfo = styled.Text`
    font-size: 12px;
    color: #243e35;
`;

const LinearGradientBox = styled(LinearGradient)`
    position: absolute;
    bottom: 0px;
    z-index: 1;
    border-radius: 12px;
`;

const BannerImage = styled.Image`
    width: 80%;
    height: 100%;
    border-radius: 16px;
    resize: contain;
`;

export default OnBoarding;
