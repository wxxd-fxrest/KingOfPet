import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import EmptyImg from '../../assets/logo.png';
import BookMarkButton from '../../components/BookMarkButton';
import NonePage from '../../components/NonePage';

const ImportantDiarySceren = () => {
    const navigation = useNavigation();

    const [currentUser, setCurrentUser] = useState([]);
    const [detailData, setDetailData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setCurrentUser(auth().currentUser);

            const handleSnapshot = (documentSnapshot) => {
                if (documentSnapshot) {
                    let feedArray = [];
                    documentSnapshot.forEach((doc) => {
                        feedArray.push({
                            DocID: doc.id,
                            Data: doc.data(),
                        });
                    });
                    setDetailData(feedArray);
                }
            };

            const subscriber = firestore()
                .collection('Users')
                .doc(`${currentUser.email}`)
                .collection('Diary')
                .where('bookmark', '==', true)
                .onSnapshot(handleSnapshot);

            // Unsubscribe 함수
            const unsubscribe = () => {
                subscriber();
            };

            // Component가 언마운트되거나 다시 렌더링될 때 unsubscribe 실행
            return unsubscribe;
        };

        fetchData();
    }, [currentUser]);

    return (
        <Container>
            {detailData.length === 0 ? (
                <NonePage type={'중요 표시한 일기'} />
            ) : (
                <>
                    {detailData.length < 1 ? (
                        <LoadingContainer>
                            <ActivityIndicator color="#243e35" />
                        </LoadingContainer>
                    ) : (
                        <FlatList
                            data={detailData}
                            ItemSeparatorComponent={heightEmpty}
                            renderItem={({ item }) => (
                                <DiaryContainer
                                    onPress={() =>
                                        navigation.navigate('MainStack', {
                                            screen: 'DiaryDetail',
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

                                        <BookMarkBottomBox>
                                            <DiaryDateBox>
                                                <MaterialCommunityIcons
                                                    name="calendar-heart"
                                                    size={14}
                                                    color="#243e35"
                                                />
                                                <DiayrDate>{item.Data.orderBy}</DiayrDate>
                                            </DiaryDateBox>

                                            <BookMarkButton
                                                DocID={item.DocID}
                                                currentUser={currentUser}
                                                detailData={item.Data}
                                            />
                                        </BookMarkBottomBox>
                                    </DiaryDetailBox>
                                </DiaryContainer>
                            )}
                            keyExtractor={(item) => item.DocID + ''}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </>
            )}
            <View
                style={{
                    height: '3%',
                    backgroundColor: '#f9f9f7',
                }}
            />
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #f9f9f7;
    padding: 0px 20px;
    padding-top: 10px;
`;

const heightEmpty = styled.View`
    height: 0px;
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

const BookMarkBottomBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 14px;
    right: 10px;
    width: 100%;
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

export default ImportantDiarySceren;
