import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import postData from '../../data/postData';

const ImportantDiarySceren = () => {
    const navigation = useNavigation();
    const [star, setStar] = useState(false);

    return (
        <Container>
            <FlatList
                data={postData}
                ItemSeparatorComponent={heightEmpty}
                renderItem={({ item }) => (
                    <>
                        {item.important === true && (
                            <DiaryContainer
                                onPress={() =>
                                    navigation.navigate('MainStack', { screen: 'DiaryDetail', params: item })
                                }
                            >
                                <DiaryImgBox>
                                    <DiaryImg source={{ uri: item.image }} />
                                </DiaryImgBox>
                                <DiaryDetailBox>
                                    <DiaryDetail numberOfLines={6} ellipsizeMode="tail">
                                        {item.description}
                                    </DiaryDetail>

                                    <LikeBottomBox>
                                        <DiaryDateBox>
                                            <MaterialCommunityIcons name="calendar-heart" size={14} color="#243e35" />
                                            <DiayrDate>2023.02.31</DiayrDate>
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
                        )}
                    </>
                )}
                keyExtractor={(item) => item.id + ''}
                showsVerticalScrollIndicator={false}
            />
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

export default ImportantDiarySceren;
