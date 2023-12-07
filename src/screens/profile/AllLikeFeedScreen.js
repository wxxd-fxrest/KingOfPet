import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import postData from '../../data/postData';
import { MaterialIcons } from '@expo/vector-icons';

const AllLikeFeedScreen = ({ handleScroll }) => {
    return (
        <Container onScroll={handleScroll}>
            <FlatList
                data={postData}
                ItemSeparatorComponent={heightEmpty}
                renderItem={({ item }) => (
                    <LikeContainer>
                        <LikeImgBox>
                            <LikeImg source={{ uri: item.image }} />
                        </LikeImgBox>
                        <LikeDetailBox>
                            <LikeDetail numberOfLines={7} ellipsizeMode="tail">
                                {item.description}
                            </LikeDetail>
                            <LikeBottomBox>
                                <LikeUserBox>
                                    <LikeUserImgBox>
                                        <LikeUserImg source={{ uri: item.userimg }} />
                                    </LikeUserImgBox>
                                    <LikeuserName>{item.username} </LikeuserName>
                                </LikeUserBox>
                                <LikeBox>
                                    <MaterialIcons name="pets" size={16} color="#243e35" />
                                </LikeBox>
                            </LikeBottomBox>
                        </LikeDetailBox>
                    </LikeContainer>
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

const LikeContainer = styled.TouchableOpacity`
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

const LikeImgBox = styled.View`
    width: 34%;
    height: 160px;
    border-radius: 12px;
    ${Platform.OS === 'android' ? 'elevation: 2;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.2; shadow-radius: 2px;'
        : ''}
`;

const LikeImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

const LikeDetailBox = styled.View`
    width: 65%;
    position: absolute;
    right: 0px;
    padding: 14px 10px;
    height: 100%;
`;

const LikeDetail = styled.Text`
    color: #343c3a;
    font-size: 12px;
    height: 80%;
`;

const LikeBottomBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 14px;
    right: 10px;
    width: 100%;
`;

const LikeUserBox = styled.View`
    width: 80%;
    flex-direction: row;
    align-items: center;
`;

const LikeUserImgBox = styled.View``;

const LikeUserImg = styled.Image`
    width: 22px;
    height: 22px;
    border-radius: 100px;
    margin-right: 4px;
`;

const LikeuserName = styled.Text`
    color: rgba(52, 60, 58, 0.8);
    font-size: 12px;
`;

const LikeBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 100px;
    background-color: rgba(193, 204, 200, 0.6);
`;

export default AllLikeFeedScreen;
