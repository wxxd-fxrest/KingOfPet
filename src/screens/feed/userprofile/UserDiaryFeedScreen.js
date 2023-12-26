import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import EmptyImg from '../../../assets/logo.png';
import { ActivityIndicator } from 'react-native';

const UserDiaryFeedScreen = ({ navigation, handleScroll, userData }) => {
    // console.log(userData);
    const [star, setStar] = useState(false);
    const [diaryData, setDiaryData] = useState([]);

    useEffect(() => {
        // if (userData) {
        const subscriber = firestore()
            .collection('Users')
            .doc(`${userData.email}`)
            .collection('Diary')
            .orderBy('orderBy', 'desc')
            .onSnapshot((documentSnapshot) => {
                let feedArray = [];
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id,
                        Data: doc.data(),
                    });
                });
                setDiaryData(feedArray);
            });

        return () => subscriber();
        // }
    }, [userData]);

    // console.log('diaryData', diaryData);

    return (
        <>
            {userData ? (
                <Container onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                    {/* true === 공개 false === 비공개 */}
                    {userData.diary === false && (
                        <PrivateBox>
                            <MaterialIcons name="lock-outline" size={18} color="gray" />
                            <Private>현재 일기장은 비공개 설정이 되어있습니다.</Private>
                        </PrivateBox>
                    )}
                    {userData.diary === true && (
                        <>
                            {diaryData.map((item) => (
                                <DiaryContainer
                                    key={item.id}
                                    onPress={() =>
                                        navigation.navigate('MainStack', {
                                            screen: 'UserDiaryDetail',
                                            params: item,
                                        })
                                    }
                                >
                                    <DiaryImgBox>
                                        <DiaryImg source={{ uri: item.Data.image[0].url } || EmptyImg} />
                                    </DiaryImgBox>
                                    <DiaryDetailBox>
                                        <DiaryDetail numberOfLines={6} ellipsizeMode="tail">
                                            {item.Data.text}
                                        </DiaryDetail>

                                        <LikeBottomBox>
                                            <DiaryDateBox>
                                                <MaterialCommunityIcons
                                                    name="calendar-heart"
                                                    size={14}
                                                    color="#243e35"
                                                />
                                                <DiayrDate>{item.Data.orderBy}</DiayrDate>
                                            </DiaryDateBox>
                                            <LikeBox onPress={() => setStar(!star)}>
                                                <MaterialCommunityIcons
                                                    name={item.important === true ? 'star-check' : 'star-plus-outline'}
                                                    size={20}
                                                    color="#243e35"
                                                />
                                            </LikeBox>
                                        </LikeBottomBox>
                                    </DiaryDetailBox>
                                </DiaryContainer>
                            ))}
                        </>
                    )}
                </Container>
            ) : (
                <ActivityIndicator color="#243e35" />
            )}
        </>
    );
};

const Container = styled.ScrollView`
    flex: 1;
    background-color: #f9f9f7;
    padding: 0px 20px;
    padding-top: 10px;
`;

const PrivateBox = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const Private = styled.Text`
    color: gray;
    font-size: 12px;
    margin-left: 4px;
`;

const DiaryContainer = styled.TouchableOpacity`
    background-color: white;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 150px;
    border-radius: 12px;
    margin-top: 4px;
    margin-bottom: 20px;
    ${Platform.OS === 'android' ? 'elevation: 2;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.2; shadow-radius: 2px;'
        : ''}
`;

const DiaryImgBox = styled.View`
    width: 34%;
    height: 160px;
    border-radius: 12px;
    ${Platform.OS === 'android' ? 'elevation: 2;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.2; shadow-radius: 2px;'
        : ''}
`;

const DiaryImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

const DiaryDetailBox = styled.View`
    width: 65%;
    position: absolute;
    right: 0px;
    padding: 10px;
    padding-top: 14px;
    height: 100%;
`;

const DiaryDetail = styled.Text`
    color: #343c3a;
    font-size: 12px;
    height: 84%;
`;

const LikeBottomBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 14px;
    right: 10px;
    width: 100%;
`;

const LikeBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 100px;
    background-color: rgba(193, 204, 200, 0.2);
`;

const DiaryDateBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

const DiayrDate = styled.Text`
    color: #343c3a;
    margin-left: 4px;
    font-size: 10px;
`;

export default UserDiaryFeedScreen;
