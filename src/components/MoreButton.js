import React from 'react';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';

const MoreButton = ({ detailDocID, navigation }) => {
    const onDelete = () => {
        Alert.alert('포스트 삭제', '삭제하시겠습니까?', [
            {
                text: 'No',
                onPress: () => console.log('no'),
                style: 'destructive',
            },
            {
                text: 'Yes',
                onPress: async () => {
                    await firestore()
                        .collection('Posts')
                        .doc(`${detailDocID}`)
                        .delete()
                        .then(() => {
                            console.log('User deleted!');
                            navigation.goBack();
                        });
                },
            },
        ]);
    };

    return (
        <MoreIcon activeOpacity={0.4} onPress={onDelete}>
            <Feather name="more-vertical" size={20} color="#243E35" />
        </MoreIcon>
    );
};

const MoreIcon = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 20px;
    width: 18px;
    height: 18px;
`;

export default MoreButton;
