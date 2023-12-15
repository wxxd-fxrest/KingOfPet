import React, { useState } from 'react';
import { FlatList, Switch, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import postData from '../../data/postData';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
    const [category, setCategory] = useState(false);
    // flase === user, true === post
    const [searchText, setSearchText] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [searchPost, setSearchPost] = useState([]);

    const toggleSwitch = () => setCategory((previousState) => !previousState);

    const handleSearch = (text) => {
        // 검색어가 변경될 때 호출되는 함수
        setSearchText(text);
        if (category === false) {
            // 실제 검색 로직을 여기에 구현
            const results = postData.filter((item) => item.username.toLowerCase().includes(text.toLowerCase()));

            // 검색 결과 업데이트
            setSearchUser(results);
        } else if (category === true) {
            // 실제 검색 로직을 여기에 구현
            const results = postData.filter((item) => item.description?.toLowerCase().includes(text.toLowerCase()));

            // 검색 결과 업데이트
            setSearchPost(results);
        }
    };

    return (
        <Container>
            <SearchInputBox>
                <SearchInput
                    placeholder={category === true ? '단어를 입력해 주세요.' : '사용자 이름을 입력해 주세요.'}
                    onChangeText={handleSearch}
                    value={searchText}
                />
                <SearchIcon>
                    <Feather name="search" size={22} color="#243e35" />
                </SearchIcon>
            </SearchInputBox>
            <ChangeBtn>
                {category === true ? <Change>사용자</Change> : <Change>게시글</Change>}
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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SearchResultBox>
                        {category === false ? (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() =>
                                    navigation.navigate('MainStack', {
                                        screen: 'UserProfile',
                                        params: item,
                                    })
                                }
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
                                            {item.username}네 집사
                                        </ResultText>
                                        <ResultText> {item.username}</ResultText>
                                    </ResultNameTag>
                                    <UserImageBox>
                                        <UserImg source={{ uri: item.image }} />
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
                                    <PostResultImg source={{ uri: item.image }} />
                                </PostResultImgBox>
                                <PostResultDetailBox>
                                    <PostResultDetail numberOfLines={7} ellipsizeMode="tail">
                                        {item.description}
                                    </PostResultDetail>
                                    <PostResultBottomBox>
                                        <PostResultProfileBox
                                            activeOpacity={0.9}
                                            onPress={() => {
                                                navigation.navigate('MainStack', {
                                                    screen: 'UserProfile',
                                                    params: item,
                                                });
                                            }}
                                        >
                                            <PostResultProfileImgBox>
                                                <PostResultProfileImg source={{ uri: item.userimg }} />
                                            </PostResultProfileImgBox>
                                            <PostResultProfileName>{item.username} </PostResultProfileName>
                                        </PostResultProfileBox>
                                        <PostResultLikeBox>
                                            <MaterialIcons name="pets" size={16} color="rgba(249, 19, 0, 0.8)" />
                                        </PostResultLikeBox>
                                    </PostResultBottomBox>
                                </PostResultDetailBox>
                            </PostResultContainer>
                        )}
                    </SearchResultBox>
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
