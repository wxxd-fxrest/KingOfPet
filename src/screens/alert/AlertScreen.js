import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import postData from '../../data/postData';

const AlertScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <AlertTitle>알림</AlertTitle>,
        });
    }, [navigation]);

    return (
        <Container>
            <FlatList
                data={postData}
                ItemSeparatorComponent={heightEmpty}
                keyExtractor={(item) => item.id + ''}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <AlertBox
                        onPress={() =>
                            navigation.navigate('MainStack', {
                                screen: 'UserProfile',
                                params: item,
                            })
                        }
                    >
                        <AlertUserProfileBox>
                            <UserImageBox>
                                <UserImg source={{ uri: item.image }} />
                            </UserImageBox>
                            <UserNameTag>
                                <UserName>{item.username}</UserName>
                                <AlertDetail>님이 나를 구독했습니다.</AlertDetail>
                            </UserNameTag>
                        </AlertUserProfileBox>
                    </AlertBox>
                )}
            />
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
    padding: 0px 20px;
`;

const heightEmpty = styled.View`
    height: 20px;
`;

const AlertBox = styled.TouchableOpacity``;

const AlertUserProfileBox = styled.View`
    flex-direction: row;
    align-items: center;
`;

const UserImageBox = styled.View`
    background-color: yellow;
    width: 40px;
    height: 40px;
    border-radius: 100px;
    margin-right: 12px;
`;

const UserImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 100px;
`;

const UserNameTag = styled.View`
    flex-direction: row;
    align-items: center;
`;

const UserName = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: #343c3a;
`;

const AlertDetail = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: #343c3a;
`;

const AlertTitle = styled.Text`
    color: #243e35;
    font-size: 18px;
    font-weight: 600;
`;

export default AlertScreen;
