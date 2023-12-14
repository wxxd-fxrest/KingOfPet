import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CommentDetailScreen = ({ navigation, route: { params } }) => {
    console.log('params', params);
    const [comment, setComment] = useState('');

    return (
        <Container onPress={() => keyboard.dismiss()}>
            <HeaderBox>
                {Platform.OS === 'ios' ? (
                    <BackIcon
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                    </BackIcon>
                ) : (
                    <BackIcon
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <AntDesign name="arrowleft" size={22} color="#243e35" />
                    </BackIcon>
                )}

                <Title>답글</Title>
            </HeaderBox>
            <Box>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CommentContainer onStartShouldSetResponder={() => true}>
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
                </ScrollView>
            </Box>
            <KeyboardAvoidingBox behavior={Platform.select({ ios: 'position', android: 'height' })}>
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
            </KeyboardAvoidingBox>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #f9f9f7;
`;

const HeaderBox = styled.View`
    background-color: #f9f9f7;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 12%;
    width: 100%;
    height: 10%;
    z-index: 10;
`;

const BackIcon = styled(MaterialIcons)`
    left: 20px;
    position: absolute;
    bottom: 24%;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #343c3a;
`;

const Box = styled.View`
    width: 100%;
    height: 82%;
`;

const KeyboardAvoidingBox = styled(KeyboardAvoidingView)`
    flex: 1;
`;

const CommentContainer = styled.View`
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
    background-color: #f9f9f7;
    justify-content: center;
    width: 100%;
    height: 120px;
    padding: 0px 20px;
    padding-bottom: 60px;
`;

const CommentInput = styled.TextInput`
    background-color: rgba(193, 204, 200, 0.3);
    padding: 10px 20px;
    padding-right: 40px;
    border-radius: 12px;
    font-size: 12px;
    width: 100%;
`;

const SaveIcon = styled.TouchableOpacity`
    position: absolute;
    right: 26px;
    top: 18px;
`;

export default CommentDetailScreen;
