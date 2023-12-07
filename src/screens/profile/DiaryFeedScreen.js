import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import postData from '../../data/postData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const DiaryFeedScreen = ({ handleScroll }) => {
    return (
        <Container onScroll={handleScroll}>
            {/* 일기장 비공개일 경우 */}
            <PrivateBox>
                <MaterialIcons name="lock-outline" size={18} color="gray" />
                <Private>현재 일기장은 비공개 설정이 되어있습니다.</Private>
            </PrivateBox>
            <FlatList
                data={postData}
                ItemSeparatorComponent={heightEmpty}
                renderItem={({ item }) => (
                    <DiaryContainer>
                        <DiaryImgBox>
                            <DiaryImg source={{ uri: item.image }} />
                        </DiaryImgBox>
                        <DiaryDetailBox>
                            <DiaryDetail numberOfLines={7} ellipsizeMode="tail">
                                {item.description}
                            </DiaryDetail>
                            <DiaryDateBox>
                                <MaterialCommunityIcons name="calendar-heart" size={14} color="#243e35" />
                                <DiayrDate>2023.02.31</DiayrDate>
                            </DiaryDateBox>
                        </DiaryDetailBox>
                    </DiaryContainer>
                )}
                keyExtractor={(item) => item.id + ''}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
};

const Container = styled.ScrollView`
    flex: 1;
    background-color: #f9f9f7;
    padding: 0px 20px;
    padding-top: 10px;
`;

const heightEmpty = styled.View`
    height: 0px;
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

const DiaryDateBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 4px;
    position: absolute;
    right: 10px;
    bottom: 14px;
`;

const DiayrDate = styled.Text`
    color: #343c3a;
    margin-left: 4px;
    font-size: 10px;
`;

export default DiaryFeedScreen;
