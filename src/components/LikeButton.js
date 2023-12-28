import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

const LikeButton = ({ currentUser, currentUserData, detailDocID }) => {
    const [like, setLike] = useState(false);
    const [detailData2, setDetailData2] = useState({});

    useEffect(() => {
        const postDoc = firestore().collection('Posts').doc(detailDocID);

        const postUnsubscribe = postDoc.onSnapshot((postSnapshot) => {
            const postData = postSnapshot.exists ? postSnapshot.data() : {};
            setDetailData2(postData);

            // like 값이 변경될 때 setLike 호출
            if (postData.like) {
                setLike(postData.like.includes(currentUserData.email));
            }
        });

        return () => {
            postUnsubscribe();
        };
    }, [currentUser, currentUserData, detailDocID]);

    const toggleLike = () => {
        const userEmail = currentUserData.email;

        if (detailData2.like && detailData2.like.includes(userEmail)) {
            firestore()
                .collection('Posts')
                .doc(detailDocID)
                .update({
                    like: firestore.FieldValue.arrayRemove(userEmail),
                });
        } else {
            firestore()
                .collection('Posts')
                .doc(detailDocID)
                .update({
                    like: firestore.FieldValue.arrayUnion(userEmail),
                });
        }
    };

    return (
        <LikeBtn onPress={toggleLike}>
            <MaterialIcons
                name="pets"
                size={18}
                color={like === true ? 'rgba(249, 19, 0, 0.8)' : 'rgba(193, 204, 200, 0.9)'}
            />
        </LikeBtn>
    );
};

const LikeBtn = styled.TouchableOpacity`
    background-color: rgba(193, 204, 200, 0.2);
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
`;

export default LikeButton;
