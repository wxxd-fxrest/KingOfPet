import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import EmptyImg from '../../assets/logo.png';

const ComentScreen = ({ toggleBottomSheet, detailDocID }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [coment, setComent] = useState('');
    const [comentData, setComentData] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentUserData, setCurrentUserData] = useState([]);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
        firestore()
            .collection('Users')
            .doc(`${currentUser.email}`)
            .onSnapshot((documentSnapshot) => {
                setCurrentUserData(documentSnapshot.data());
                console.log('profile User data: ', documentSnapshot.data());
            });
    }, [currentUser]);

    useEffect(() => {
        if (detailDocID) {
            const subscriber = firestore()
                .collection('Posts')
                .doc(`${detailDocID}`)
                .collection('Coment')
                .orderBy('orderBy', 'desc')
                .onSnapshot((documentSnapshot) => {
                    if (documentSnapshot) {
                        let feedArray = [];
                        documentSnapshot.forEach((doc) => {
                            feedArray.push({
                                DocID: doc.id,
                                Data: doc.data(),
                            });
                        });
                        setComentData(feedArray);
                        // console.log('comentData', feedArray);
                    }
                });

            return () => subscriber();
        }
    }, [detailDocID]);

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
            .doc(`${detailDocID}`)
            .collection('Coment')
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
            <HeaderBox>
                <Bar />
            </HeaderBox>
            <KeyboardAvoidingBox behavior={Platform.select({ ios: 'position', android: 'height' })}>
                <CurrentUerProfile>
                    <CurrentUserImgBox>
                        <CurrentUserProfileImg
                            source={currentUserData && { uri: currentUserData.petimage || EmptyImg }}
                        />
                    </CurrentUserImgBox>
                    <ComentInputBox>
                        <ComentInput
                            value={coment}
                            placeholder="Write a note..."
                            placeholderTextColor="grey"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            maxLength={300}
                            multiline={true}
                            onSubmitEditing={onSubmitEditing}
                            onChangeText={(text) => setComent(text)}
                        />
                        <SaveIcon onPress={onSubmitEditing}>
                            <MaterialIcons name="pets" size={22} color="#243e35" />
                        </SaveIcon>
                    </ComentInputBox>
                </CurrentUerProfile>
            </KeyboardAvoidingBox>
            <FlatListBox
                data={comentData}
                keyExtractor={(item) => item.DocID + ''}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <>
                        {item.Data.coment && (
                            <ComentContainer
                                onStartShouldSetResponder={() => true}
                                activeOpacity={1}
                                onPress={() => {
                                    toggleBottomSheet();
                                    navigation.navigate('MainStack', {
                                        screen: 'ComentDetail',
                                        params: { item, detailDocID },
                                    });
                                }}
                            >
                                <ProfileImgBox
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        toggleBottomSheet();
                                        <>
                                            {currentUser.email === item.Data.useremail
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
                                    <ProfileImg source={{ uri: item.Data.petimage } || EmptyImg} />
                                </ProfileImgBox>
                                <ComentBox>
                                    <ProfileNameTagBox
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            toggleBottomSheet();
                                            <>
                                                {currentUser.email === item.Data.useremail
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
                            </ComentContainer>
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

const ComentInputBox = styled.View`
    background-color: #f9f9f7;
    justify-content: center;
    width: 86%;
    justify-content: center;
    align-items: flex-end;
`;

const ComentInput = styled.TextInput`
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

const ComentContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
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

export default ComentScreen;
