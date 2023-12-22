import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, NativeModules, ScrollView, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const { StatusBarManager } = NativeModules;

const ComentDetailScreen = ({ navigation, route: { params } }) => {
    let feedDocID;
    let comentData;
    let comentDocID;
    if (params) {
        feedDocID = params?.detailDocID;
        comentData = params?.item.Data;
        comentDocID = params?.item.DocID;
    }

    const [loading, setLoading] = useState(false);
    const [coment, setComent] = useState('');
    const [comentDetailData, setComentDetailData] = useState([]);
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentUserData, setCurrentUserData] = useState([]);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        // console.log('profile', currentUser);
        firestore()
            .collection('Users')
            .doc(`${currentUser.email}`)
            .onSnapshot((documentSnapshot) => {
                setCurrentUserData(documentSnapshot.data());
                // console.log('profile User data: ', documentSnapshot.data());
            });
    }, [currentUser]);

    useEffect(() => {
        if (feedDocID) {
            const subscriber = firestore()
                .collection('Posts')
                .doc(`${feedDocID}`)
                .collection('Coment')
                .doc(`${comentDocID}`)
                .collection('ComentDetail')
                .orderBy('orderBy')
                .onSnapshot((documentSnapshot) => {
                    let feedArray = [];
                    documentSnapshot.forEach((doc) => {
                        feedArray.push({
                            DocID: doc.id,
                            Data: doc.data(),
                        });
                    });
                    setComentDetailData(feedArray);
                    // console.log('comentDetailData', comentDetailData);
                });

            return () => subscriber();
        }
    }, [feedDocID]);

    useEffect(() => {
        Platform.OS == 'ios'
            ? StatusBarManager.getHeight((statusBarFrameData) => {
                  setStatusBarHeight(statusBarFrameData.height);
              })
            : null;
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                Platform.OS === 'ios' ? (
                    <BackButton onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" size={22} color="#243e35" />
                    </BackButton>
                ) : null,
        });
    }, [navigation]);

    let timestamp = Date.now();
    let date = new Date(timestamp);
    let saveDate =
        date.getFullYear() +
        '년 ' +
        (date.getMonth() + 1) +
        '월 ' +
        date.getDate() +
        '일 ' +
        date.getHours() +
        '시 ' +
        date.getMinutes() +
        '분 ' +
        date.getSeconds() +
        '초';

    const onSubmitEditing = async () => {
        if (loading) {
            return;
        }
        firestore()
            .collection('Posts')
            .doc(`${feedDocID}`)
            .collection('Coment')
            .doc(`${comentDocID}`)
            .collection('ComentDetail')
            .add({
                coment: coment,
                email: currentUserData.email,
                petimage: currentUserData.petimage,
                petname: currentUserData.petname,
                userid: currentUserData.userid,
                orderBy: saveDate,
            })
            .then(() => {
                console.log('User added!');
                setComent('');
            });
    };

    return (
        <Container>
            <KeyboardView
                behavior={Platform.select({ ios: 'padding', android: undefined })}
                keyboardVerticalOffset={statusBarHeight + 44}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ContentsContainer>
                        <ComentContainer>
                            <ProfileBox>
                                <ProfileImgBox activeOpacity={0.8}>
                                    <ProfileImg source={{ uri: comentData.petimage }} />
                                </ProfileImgBox>

                                <ProfileNameTagBox
                                    activeOpacity={0.8}
                                    style={{
                                        width: '80%',
                                    }}
                                >
                                    <ComentProfileNameTag>{comentData.petname}</ComentProfileNameTag>
                                </ProfileNameTagBox>

                                <MoreIcon activeOpacity={0.4}>
                                    <Feather name="more-vertical" size={16} color="#243E35" />
                                </MoreIcon>
                            </ProfileBox>
                            <ComentDetailBox
                                style={{
                                    marginLeft: 30,
                                    padding: 8,
                                }}
                            >
                                <ComentDetail>{comentData.coment}</ComentDetail>
                            </ComentDetailBox>
                        </ComentContainer>
                    </ContentsContainer>
                    <FlatListBox
                        data={comentDetailData}
                        keyExtractor={(item) => item.DocID + ''}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <>
                                {item.Data.coment && (
                                    <ComentDetailContainer onStartShouldSetResponder={() => true} activeOpacity={1}>
                                        <ProfileImgBox
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                <>
                                                    {currentUser.email === item.Data.email
                                                        ? navigation.navigate('MainTab', {
                                                              screen: 'MyProfile',
                                                          })
                                                        : navigation.navigate('MainStack', {
                                                              screen: 'UserProfile',
                                                              params: item.Data,
                                                          })}
                                                </>;
                                            }}
                                        >
                                            <ProfileImg source={{ uri: item.Data.petimage || EmptyImg }} />
                                        </ProfileImgBox>
                                        <ComentBox>
                                            <ProfileNameTagBox
                                                activeOpacity={0.8}
                                                onPress={() => {
                                                    <>
                                                        {currentUser.email === item.Data.email
                                                            ? navigation.navigate('MainTab', {
                                                                  screen: 'MyProfile',
                                                              })
                                                            : navigation.navigate('MainStack', {
                                                                  screen: 'UserProfile',
                                                                  params: item.Data,
                                                              })}
                                                    </>;
                                                }}
                                            >
                                                <ProfileNameTag>{item.Data.petname}</ProfileNameTag>
                                            </ProfileNameTagBox>
                                            <ComentDetailBox>
                                                <ComentDetail>{item.Data.coment}</ComentDetail>
                                            </ComentDetailBox>
                                        </ComentBox>
                                        <MoreIcon activeOpacity={0.4}>
                                            <Feather name="more-vertical" size={16} color="#243E35" />
                                        </MoreIcon>
                                    </ComentDetailContainer>
                                )}
                            </>
                        )}
                    />
                </ScrollView>

                <ComentInputBox>
                    <ComentInput
                        value={coment}
                        placeholder="Write a note..."
                        placeholderTextColor="grey"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        maxLength={300}
                        multiline={true}
                        onSubmitEditing={onSubmitEditing}
                        onChangeText={(text) => setComent(text)}
                    />
                    <SaveIcon onPress={onSubmitEditing}>
                        <MaterialIcons name="pets" size={22} color="#243e35" />
                    </SaveIcon>
                </ComentInputBox>
            </KeyboardView>
        </Container>
    );
};

const BackButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
`;

const ContentsContainer = styled.View`
    flex: 1;
    border-bottom-width: 1px;
    border-color: rgba(193, 204, 200, 0.3);
`;

const FlatListBox = styled(FlatList)``;

const KeyboardView = styled(KeyboardAvoidingView)`
    flex: 1;
`;

const ComentContainer = styled.View`
    justify-content: space-between;
    padding: 20px;
`;

const ProfileBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ComentDetailContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
`;

const ComentBox = styled.View`
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

const ComentProfileNameTag = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: #343c3a;
`;

const ProfileNameTag = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: #343c3a;
    margin-bottom: 6px;
`;

const ComentDetailBox = styled.View``;

const ComentDetail = styled.Text`
    font-size: 12px;
    color: #343c3a;
`;

const MoreIcon = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
`;

const ComentInputBox = styled.View`
    background-color: white;
    margin-top: auto;
    border-top-width: 1px;
    border-top-color: #eaeaea;
    padding: 0px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ComentInput = styled.TextInput`
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

export default ComentDetailScreen;
