import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import postData from '../../data/postData';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CommentScreen = ({ toggleBottomSheet }) => {
    const navigation = useNavigation();
    return (
        <Container>
            <HeaderBox>
                <Bar />
            </HeaderBox>
            <FlatList
                data={postData}
                keyExtractor={(item) => item.id + ''}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <>
                        {item.description && (
                            <CommentContainer
                                onStartShouldSetResponder={() => true}
                                activeOpacity={1}
                                onPress={() => {
                                    toggleBottomSheet();
                                    navigation.navigate('MainStack', {
                                        screen: 'CommentDetail',
                                        params: item,
                                    });
                                }}
                            >
                                <ProfileImgBox
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        toggleBottomSheet();
                                        navigation.navigate('MainStack', {
                                            screen: 'UserProfile',
                                            params: item,
                                        });
                                    }}
                                >
                                    <ProfileImg source={{ uri: item.image }} />
                                </ProfileImgBox>
                                <CommentBox>
                                    <ProfileNameTagBox
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            toggleBottomSheet();
                                            navigation.navigate('MainStack', {
                                                screen: 'UserProfile',
                                                params: item,
                                            });
                                        }}
                                    >
                                        <ProfileNameTag>{item.username}</ProfileNameTag>
                                    </ProfileNameTagBox>
                                    <CommentDetailBox>
                                        <CommentDetail>{item.description}</CommentDetail>
                                    </CommentDetailBox>
                                </CommentBox>
                                <MoreIcon activeOpacity={0.4}>
                                    <Feather name="more-vertical" size={16} color="#243E35" />
                                </MoreIcon>
                            </CommentContainer>
                        )}
                    </>
                )}
            />
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    width: 100%;
`;

const HeaderBox = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Bar = styled.View`
    background-color: #d5d5d4;
    width: 44px;
    height: 4px;
    border-radius: 10px;
`;

const CommentContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
`;

const CommentBox = styled.View`
    width: 80%;
`;

const ProfileImgBox = styled.TouchableOpacity`
    width: 34px;
    height: 34px;
`;

const ProfileImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

const ProfileNameTagBox = styled.TouchableOpacity``;

const ProfileNameTag = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: #343c3a;
    margin-bottom: 6px;
`;

const CommentDetailBox = styled.View``;

const CommentDetail = styled.Text`
    font-size: 12px;
    color: #343c3a;
`;

const MoreIcon = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
`;

export default CommentScreen;
