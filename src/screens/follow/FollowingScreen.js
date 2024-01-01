import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import FollowButton from '../../components/FollowButton';

const FollowingScreen = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState(auth().currentUser);
    const [currentUserData, setCurrentUserData] = useState({});

    useEffect(() => {
        const currentDoc = firestore().collection('Users').doc(currentUser.email);

        const currentUnsubscribe = currentDoc.onSnapshot((userSnapshot) => {
            setCurrentUserData(userSnapshot.data());
            // console.log('currentUserData', currentUserData.following);
        });

        return () => {
            currentUnsubscribe();
        };
    }, [currentUser]);

    return (
        <Container>
            <FlatList
                data={currentUserData.following_data}
                ItemSeparatorComponent={heightEmpty}
                keyExtractor={(item) => item.email + ''}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    if (currentUserData) {
                        isFollowing =
                            Array.isArray(currentUserData.following) && currentUserData.following.includes(item.email);
                    }
                    console.log('item', item.email, isFollowing);
                    return (
                        <UserBox
                            onPress={() => {
                                navigation.navigate('MainStack', {
                                    screen: 'UserProfile',
                                    params: item,
                                });
                            }}
                        >
                            <UserImgBox>
                                <UserImg source={{ uri: item.petimage }} />
                            </UserImgBox>

                            <ProfilePetNameBox>
                                <ProfilePetNameTitle>상전</ProfilePetNameTitle>
                                <ProfilePetName>{item.petname}</ProfilePetName>
                            </ProfilePetNameBox>

                            <FollowButton isFollowing={isFollowing} currentUserData={currentUserData} userData={item} />
                        </UserBox>
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

const heightEmpty = styled.View`
    height: 20px;
`;

const UserBox = styled.TouchableOpacity`
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
    background-color: #243e35;
    padding: 8px 12px;
    border-radius: 16px;
    border-width: 1px;
    border-color: #243e35;
`;

const Follow = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: #f9f9f7;
`;

export default FollowingScreen;
