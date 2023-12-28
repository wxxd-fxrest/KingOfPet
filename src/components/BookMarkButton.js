import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BookMarkButton = ({ DocID, currentUser, detailData }) => {
    const [bookMark, setBookMark] = useState(false);

    useEffect(() => {
        if (detailData && detailData.bookmark !== undefined) {
            setBookMark(detailData.bookmark);
        }
        console.log(bookMark);
    }, [detailData]);

    const toggleBookMark = () => {
        if (bookMark === false) {
            firestore().collection('Users').doc(`${currentUser.email}`).collection('Diary').doc(`${DocID}`).update({
                bookmark: true,
            });
            setBookMark(true);
        } else {
            firestore().collection('Users').doc(`${currentUser.email}`).collection('Diary').doc(`${DocID}`).update({
                bookmark: false,
            });
            setBookMark(false);
        }
    };
    return (
        <BookMarkBtn onPress={toggleBookMark}>
            <MaterialCommunityIcons
                name={bookMark === true ? 'star-check' : 'star-plus-outline'}
                size={18}
                color="#243e35"
            />
        </BookMarkBtn>
    );
};

const BookMarkBtn = styled.TouchableOpacity`
    background-color: rgba(193, 204, 200, 0.2);
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    margin-top: 4px;
`;

export default BookMarkButton;
