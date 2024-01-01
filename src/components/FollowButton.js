import React from 'react';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';

const FollowButton = ({ isFollowing, currentUserData, userData }) => {
    let userFollow;
    if (userData) {
        userFollow = {
            email: userData.email,
            userid: userData.userid,
            petimage: userData.petimage,
            petname: userData.petname,
        };
    }

    let currentFollow;
    if (currentUserData) {
        currentFollow = {
            email: currentUserData.email,
            userid: currentUserData.userid,
            petimage: currentUserData.petimage,
            petname: currentUserData.petname,
        };
    }

    const onClickFollowing = async () => {
        if (Array.isArray(currentUserData.following) && currentUserData.following.includes(userData.email)) {
            // 이미 팔로우 했을 경우
            // currentuser
            firestore()
                .collection('Users')
                .doc(`${currentUserData.email}`)
                .update({
                    // 배열에서 특정 값 제거
                    following: firestore.FieldValue.arrayRemove(`${userData.email}`),
                    following_data: firestore.FieldValue.arrayRemove(userFollow),
                });

            firestore()
                .collection('Users')
                .doc(`${userData.email}`)
                .update({
                    // 배열에서 특정 값 제거
                    follower: firestore.FieldValue.arrayRemove(`${currentUserData.email}`),
                    follower_data: firestore.FieldValue.arrayRemove(currentFollow),
                });
        } else {
            // currentuser
            firestore()
                .collection('Users')
                .doc(`${currentUserData.email}`)
                .update({
                    following: [...(currentUserData.following || []), userData.email],
                    following_data: [...(currentUserData.following_data || []), userFollow],
                });

            // user
            firestore()
                .collection('Users')
                .doc(`${userData.email}`)
                .update({
                    follower: [...(userData.follower || []), currentUserData.email],
                    follower_data: [...(userData.follower_data || []), currentFollow],
                })
                .then(() => {
                    console.log('User added!');
                });
        }
    };

    return (
        <FollowBox onPress={onClickFollowing} isFollowing={isFollowing}>
            <Follow isFollowing={isFollowing}>{isFollowing === true ? 'Unfollow' : 'Follow'}</Follow>
        </FollowBox>
    );
};

const FollowBox = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    background-color: ${(props) => (props.isFollowing ? 'rgba(193, 204, 200, 0.2)' : '#243e35')};
    padding: 8px 12px;
    border-radius: 16px;
    border-width: 1px;
    border-color: #243e35;
`;

const Follow = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => (props.isFollowing ? '#243e35' : 'rgb(193, 204, 200)')};
`;

export default FollowButton;
