import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import postData from '../../data/postData';

const FollowerScreen = () => {
    return (
        <Container>
            <FlatList
                data={postData}
                ItemSeparatorComponent={heightEmpty}
                keyExtractor={(item) => item.id + ''}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <UserBox>
                        <UserImgBox>
                            <UserImg source={{ uri: item.image }} />
                        </UserImgBox>
                        <ProfilePetNameBox>
                            <ProfilePetNameTitle>상전</ProfilePetNameTitle>
                            <ProfilePetName>{item.username}</ProfilePetName>
                        </ProfilePetNameBox>
                        <FollowBox>
                            <Follow>Follow</Follow>
                        </FollowBox>
                    </UserBox>
                )}
            />
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
    padding: 20px;
`;

const heightEmpty = styled.View`
    height: 20px;
`;

const UserBox = styled.View`
    flex-direction: row;
    align-items: center;
`;

const UserImgBox = styled.View`
    background-color: yellow;
    width: 48px;
    height: 48px;
    border-radius: 100px;
    margin-right: 12px;
`;

const UserImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 100px;
`;

const ProfilePetNameBox = styled.View``;

const ProfilePetNameTitle = styled.Text`
    margin-bottom: 4px;
    margin-right: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #343c3a;
`;

const ProfilePetName = styled.Text`
    font-size: 16px;
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

export default FollowerScreen;
