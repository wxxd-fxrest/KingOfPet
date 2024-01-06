import React, { useEffect, useState } from 'react';
import { FlatList, Switch, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Feather } from '@expo/vector-icons';
import EmptyImg from '../../assets/logo.png';
import LikeButton from '../../components/LikeButton';

const SearchScreen = ({ navigation }) => {
    // flase === user, true === post
    const [category, setCategory] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [searchPost, setSearchPost] = useState([]);
    const [currentUser, setCurrentUser] = useState(auth().currentUser);
    const [currentUserData, setCurrentUserData] = useState({});

    useEffect(() => {
        const userDoc = firestore().collection('Users').doc(currentUser.email);

        const userUnsubscribe = userDoc.onSnapshot((userSnapshot) => {
            setCurrentUserData(userSnapshot.data());
        });

        return () => {
            userUnsubscribe();
        };
    }, [currentUser]);

    const toggleSwitch = () => setCategory((previousState) => !previousState);

    const onSubmitEditing = () => {
        if (category === true) {
            firestore()
                .collection('Posts')
                .where('text', '>=', searchText) // 변경된 부분
                .where('text', '<=', searchText + '\uf8ff') // 변경된 부분
                .onSnapshot((documentSnapshot) => {
                    const promises = [];

                    const updatedFeedArray = documentSnapshot.docs.map((doc) => {
                        const postData = doc.data();
                        const feedItem = {
                            DocID: doc.id,
                            Data: postData,
                            userData: {},
                        };

                        // 각 게시글에 대한 useremail을 사용하여 유저 정보 가져오기
                        const userPromise = firestore()
                            .collection('Users')
                            .doc(postData.useremail)
                            .get()
                            .then((userDoc) => {
                                const userData = userDoc.data();
                                feedItem.userData = userData;
                            })
                            .catch((error) => {
                                console.error('Error fetching user data:', error);
                            });

                        promises.push(userPromise);
                        return feedItem;
                    });

                    // 모든 유저 정보가 로드된 후에 setSearchPost 호출
                    Promise.all(promises)
                        .then(() => {
                            setSearchPost(updatedFeedArray);
                            // console.log('searchPost', searchPost[0].userData.petname);
                        })
                        .catch((error) => {
                            console.error('Error fetching user data:', error);
                        });
                });
        } else if (category === false) {
            firestore()
                .collection('Users')
                .where('petname', '==', `${searchText}`)
                .onSnapshot((documentSnapshot) => {
                    let feedArray = [];
                    documentSnapshot.forEach((doc) => {
                        feedArray.push({
                            DocID: doc.id,
                            Data: doc.data(),
                        });
                    });
                    setSearchUser(feedArray);
                    // console.log('searchUser', searchUser);
                });
        }
    };

    return (
        <Container>
            <SearchInputBox>
                <SearchInput
                    placeholder={category === true ? '단어를 입력해 주세요.' : '상전의 이름을 입력해 주세요.'}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                />
                <SearchIcon>
                    <Feather name="search" size={22} color="#243e35" />
                </SearchIcon>
            </SearchInputBox>
            <ChangeBtn>
                {category === true ? <Change>상전 검색하기</Change> : <Change>게시글 검색하기</Change>}
                <Switch
                    trackColor={{ false: '#767577', true: '#c1ccc8' }}
                    thumbColor={category ? '#243e35' : '#3a6b5a'}
                    ios_backgroundColor="#d5d5d4"
                    onValueChange={toggleSwitch}
                    value={category}
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                />
            </ChangeBtn>

            <FlatList
                data={category === false ? searchUser : searchPost}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.DocID + ''}
                renderItem={({ item }) => {
                    return (
                        <SearchResultBox>
                            {category === false ? (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => (
                                        <>
                                            {currentUser.email === item.Data.email
                                                ? navigation.navigate('MainTab', {
                                                      screen: 'MyProfile',
                                                  })
                                                : navigation.navigate('MainStack', {
                                                      screen: 'UserProfile',
                                                      params: item.Data,
                                                  })}
                                        </>
                                    )}
                                >
                                    <SearchUserProfileBox>
                                        <Line />
                                        <ResultNameTag>
                                            <ResultText
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {item.Data.userid}네 상전
                                            </ResultText>
                                            <ResultText>{item.Data.petname}</ResultText>
                                        </ResultNameTag>
                                        <UserImageBox>
                                            <UserImg source={{ uri: item.Data.petimage } || EmptyImg} />
                                        </UserImageBox>
                                        <GoProfileIcon name="arrow-up-right" size={26} color="#243e35" />
                                    </SearchUserProfileBox>
                                </TouchableOpacity>
                            ) : (
                                <PostResultContainer
                                    activeOpacity={0.9}
                                    onPress={() =>
                                        navigation.navigate('MainStack', {
                                            screen: 'Detail',
                                            params: item,
                                        })
                                    }
                                >
                                    <PostResultImgBox>
                                        <PostResultImg source={{ uri: item.Data.image[0].url } || EmptyImg} />
                                    </PostResultImgBox>
                                    <PostResultDetailBox>
                                        <PostResultDetail numberOfLines={7} ellipsizeMode="tail">
                                            {item.Data.text}
                                        </PostResultDetail>
                                        <PostResultBottomBox>
                                            <PostResultProfileBox
                                                activeOpacity={0.9}
                                                onPress={() => {
                                                    <>
                                                        {currentUser.email === item.userData.email
                                                            ? navigation.navigate('MainTab', {
                                                                  screen: 'MyProfile',
                                                              })
                                                            : navigation.navigate('MainStack', {
                                                                  screen: 'UserProfile',
                                                                  params: item.userData,
                                                              })}
                                                    </>;
                                                }}
                                            >
                                                <PostResultProfileImgBox>
                                                    <PostResultProfileImg
                                                        source={{ uri: item.userData.petimage } || EmptyImg}
                                                    />
                                                </PostResultProfileImgBox>
                                                <PostResultProfileName>{item.userData.petname}</PostResultProfileName>
                                            </PostResultProfileBox>
                                            <LikeButton
                                                currentUser={currentUser}
                                                currentUserData={currentUserData}
                                                detailDocID={item.DocID}
                                            />
                                        </PostResultBottomBox>
                                    </PostResultDetailBox>
                                </PostResultContainer>
                            )}
                        </SearchResultBox>
                    );
                }}
            />
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
    padding: 20px;
`;

const SearchInputBox = styled.View`
    justify-content: center;
    margin-bottom: 10px;
`;

const SearchIcon = styled.View`
    position: absolute;
    left: 2%;
`;

const SearchInput = styled.TextInput`
    height: 48px;
    border-color: gray;
    border-width: 1px;
    border-radius: 12px;
    padding: 12px 10px;
    padding-left: 10%;
    z-index: 1000;
    color: #243e35;
`;

const ChangeBtn = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

const Change = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: #343c3a;
`;

const SearchResultBox = styled.View`
    margin-top: 10px;
`;

const SearchUserProfileBox = styled.View`
    flex-direction: row;
    align-items: center;
    padding-right: 14px;
`;

const Line = styled.View`
    background-color: #243e35;
    width: 2px;
    height: 60%;
    margin-right: 14px;
`;

const UserImageBox = styled.View`
    width: 90px;
    height: 80px;
    margin-right: 14px;
    justify-content: center;
    align-items: center;
`;

const UserImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

const ResultNameTag = styled.View`
    align-items: flex-start;
    width: 50%;
    margin-right: 14px;
`;

const ResultText = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: #343c3a;
`;

const GoProfileIcon = styled(Feather)``;

const PostResultContainer = styled.TouchableOpacity`
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

const PostResultImgBox = styled.View`
    width: 34%;
    height: 160px;
    border-radius: 12px;
    ${Platform.OS === 'android' ? 'elevation: 2;' : ''}
    ${Platform.OS === 'ios'
        ? 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.2; shadow-radius: 2px;'
        : ''}
`;

const PostResultImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

const PostResultDetailBox = styled.View`
    width: 65%;
    position: absolute;
    right: 0px;
    padding: 14px 10px;
    height: 100%;
`;

const PostResultDetail = styled.Text`
    color: #343c3a;
    font-size: 12px;
    height: 80%;
`;

const PostResultBottomBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 14px;
    right: 10px;
    width: 100%;
`;

const PostResultProfileBox = styled.TouchableOpacity`
    width: 80%;
    flex-direction: row;
    align-items: center;
`;

const PostResultProfileImgBox = styled.View``;

const PostResultProfileImg = styled.Image`
    width: 22px;
    height: 22px;
    border-radius: 100px;
    margin-right: 4px;
`;

const PostResultProfileName = styled.Text`
    color: rgba(52, 60, 58, 0.8);
    font-size: 12px;
`;

const PostResultLikeBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 100px;
    background-color: rgba(193, 204, 200, 0.2);
`;

export default SearchScreen;
