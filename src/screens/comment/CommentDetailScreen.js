import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, NativeModules } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const { StatusBarManager } = NativeModules;

const CommentDetailScreen = ({ navigation, route: { params } }) => {
    const [comment, setComment] = useState('');
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    useEffect(() => {
        Platform.OS == 'ios'
            ? StatusBarManager.getHeight((statusBarFrameData) => {
                  setStatusBarHeight(statusBarFrameData.height);
              })
            : null;
    }, []);

    return (
        <Container>
            <KeyboardView
                behavior={Platform.select({ ios: 'padding', android: undefined })}
                keyboardVerticalOffset={statusBarHeight + 44}
            >
                <ContentsContainer>
                    <CommentContainer>
                        <ProfileImgBox activeOpacity={0.8}>
                            <ProfileImg source={{ uri: params.image }} />
                        </ProfileImgBox>
                        <CommentBox>
                            <ProfileNameTagBox activeOpacity={0.8}>
                                <ProfileNameTag>{params.username}</ProfileNameTag>
                            </ProfileNameTagBox>
                            <CommentDetailBox>
                                <CommentDetail>{params.description}</CommentDetail>
                            </CommentDetailBox>
                        </CommentBox>
                        <MoreIcon activeOpacity={0.4}>
                            <Feather name="more-vertical" size={16} color="#243E35" />
                        </MoreIcon>
                    </CommentContainer>
                </ContentsContainer>

                <CommentInputBox>
                    <CommentInput
                        value={comment}
                        placeholder="Write a note..."
                        placeholderTextColor="grey"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        maxLength={300}
                        multiline={true}
                        onSubmitEditing={() => {
                            // Handle submit action here
                        }}
                        onChangeText={(text) => setComment(text)}
                    />
                    <SaveIcon>
                        <MaterialIcons name="pets" size={22} color="#243e35" />
                    </SaveIcon>
                </CommentInputBox>
            </KeyboardView>
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
`;

const ContentsContainer = styled.ScrollView`
    flex: 1;
`;

const KeyboardView = styled(KeyboardAvoidingView)`
    flex: 1;
`;

const CommentContainer = styled.View`
    /* background-color: yellowgreen; */
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
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

const CommentInputBox = styled.View`
    background-color: white;
    margin-top: auto;
    border-top-width: 1px;
    border-top-color: #eaeaea;
    padding: 0px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const CommentInput = styled.TextInput`
    background-color: rgba(193, 204, 200, 0.3);
    margin-bottom: 30px;
    margin-top: 10px;
    padding: 10px 20px;
    padding-right: 40px;
    border-radius: 12px;
    font-size: 12px;
    width: 100%;
    height: 40px;
`;

const SaveIcon = styled.TouchableOpacity`
    position: absolute;
    right: 30px;
    top: 22%;
`;

export default CommentDetailScreen;
