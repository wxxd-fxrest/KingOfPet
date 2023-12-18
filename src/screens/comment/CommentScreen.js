import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import postData from '../../data/postData';

const CommentScreen = ({ toggleBottomSheet, userData }) => {
    const navigation = useNavigation();
    const [comment, setComment] = useState('');

    return (
        <Container>
            <HeaderBox>
                <Bar />
            </HeaderBox>
            <KeyboardAvoidingBox behavior={Platform.select({ ios: 'position', android: 'height' })}>
                <CurrentUerProfile>
                    <CurrentUserImgBox>
                        <CurrentUserProfileImg source={{ uri: userData.petimage }} />
                    </CurrentUserImgBox>
                    <CommentInputBox>
                        <CommentInput
                            value={comment}
                            placeholder="Write a note..."
                            placeholderTextColor="grey"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            maxLength={300}
                            multiline={true}
                            // onSubmitEditing={}
                            onChangeText={(text) => setComment(text)}
                        />
                        <SaveIcon>
                            <MaterialIcons name="pets" size={22} color="#243e35" />
                        </SaveIcon>
                    </CommentInputBox>
                </CurrentUerProfile>
            </KeyboardAvoidingBox>
            <FlatListBox
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
    margin-bottom: 30px;
`;

const Bar = styled.View`
    background-color: #d5d5d4;
    width: 44px;
    height: 4px;
    border-radius: 10px;
`;

const KeyboardAvoidingBox = styled(KeyboardAvoidingView)`
    width: 100%;
    height: 8%;
`;

const CurrentUerProfile = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    border-bottom-width: 1px;
    border-color: #d5d5d4;
`;

const CurrentUserImgBox = styled.View`
    width: 34px;
    height: 34px;
`;

const CurrentUserProfileImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

const CommentInputBox = styled.View`
    background-color: #f9f9f7;
    justify-content: center;
    width: 86%;
    justify-content: center;
    align-items: flex-end;
`;

const CommentInput = styled.TextInput`
    background-color: rgba(193, 204, 200, 0.3);
    padding: 10px 20px;
    padding-right: 40px;
    border-radius: 12px;
    font-size: 12px;
    width: 100%;
    height: 36px;
`;

const SaveIcon = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
`;

const FlatListBox = styled(FlatList)`
    height: 80%;
    margin-top: 20px;
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
