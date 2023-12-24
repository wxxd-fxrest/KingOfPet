import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';

const FollowButton = ({ follow, setFollow, currentUserData, userData }) => {
    useEffect(() => {
        if (currentUserData) {
            if (Array.isArray(currentUserData.following) && currentUserData.following.includes(userData.petname)) {
                setFollow(true);
            } else if (
                Array.isArray(currentUserData.following) &&
                !currentUserData.following.includes(userData.petname)
            ) {
                setFollow(false);
            }
            console.log(follow);
        } else {
            return;
        }
    }, [currentUserData, userData.petname, follow]);

    const onClickFollowing = async () => {
        if (Array.isArray(currentUserData.following) && currentUserData.following.includes(userData.petname)) {
            // 이미 팔로우 했을 경우
            // currentuser
            firestore()
                .collection('Users')
                .doc(`${currentUserData.email}`)
                .update({
                    // 배열에서 특정 값 제거
                    following: firestore.FieldValue.arrayRemove(`${userData.petname}`),
                });

            firestore()
                .collection('Users')
                .doc(`${userData.email}`)
                .update({
                    // 배열에서 특정 값 제거
                    follower: firestore.FieldValue.arrayRemove(`${currentUserData.petname}`),
                });
        } else {
            // currentuser
            firestore()
                .collection('Users')
                .doc(`${currentUserData.email}`)
                .update({
                    following: [...currentUserData.following, userData.petname],
                });
            // user
            firestore()
                .collection('Users')
                .doc(`${userData.email}`)
                .update({
                    follower: [...userData?.follower, currentUserData.petname],
                })
                .then(() => {
                    console.log('User added!');
                });
        }
    };

    return (
        <FollowBox onPress={onClickFollowing} follow={follow}>
            <Follow follow={follow}>{follow === true ? 'Unfollow' : 'Follow'}</Follow>
        </FollowBox>
    );
};

const FollowBox = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    background-color: ${(props) => (props.follow ? 'rgba(193, 204, 200, 0.2)' : '#243e35')};
    padding: 8px 12px;
    border-radius: 16px;
    border-width: 1px;
    border-color: #243e35;
`;

const Follow = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: ${(props) => (props.follow ? '#243e35' : 'rgb(193, 204, 200)')};
`;

export default FollowButton;
