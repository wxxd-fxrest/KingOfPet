import React, { useState } from 'react';
import styled from 'styled-components';
import { ActivityIndicator, Image, Pressable, TouchableOpacity } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import postData from '../../data/postData';
import LinearGradient from 'react-native-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const RandomFeedScreen = ({ navigation, handleScroll }) => {
    // 랜덤한 dimensions 값을 생성하는 함수
    const generateRandomDimensions = () => {
        const width = Math.floor(Math.random() * 200) + 100; // 최소 100, 최대 300
        const height = Math.floor(Math.random() * 191) + 130; // 최소 130, 최대 320
        return { width, height };
    };

    const [dataWithDimensions, setDataWithDimensions] = useState(() =>
        postData.map((item) => ({
            ...item,
            dimensions: generateRandomDimensions(),
        }))
    );

    return (
        <Container>
            {dataWithDimensions.length === 0 ? (
                <LoadingContainer>
                    <ActivityIndicator color="red" />
                </LoadingContainer>
            ) : (
                <MasonryList
                    onScroll={handleScroll}
                    data={dataWithDimensions}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => <RandomCard item={item} index={i} navigation={navigation} />}
                    onEndReachedThreshold={0.1}
                />
            )}
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    padding: 0 4px;
    padding-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`;

const LoadingContainer = styled.View`
    margin-top: 100px;
`;

export default RandomFeedScreen;

const RandomCard = ({ item, index, navigation }) => {
    const isEven = index % 2 === 0;

    return (
        <AnimatedContainer
            entering={FadeInDown.delay(index * 100)
                .duration(600)
                .springify()
                .damping(12)}
            style={{
                marginBottom: isEven ? 4 : 4,
            }}
        >
            {item.qna_boolen === true && (
                <QnABox>
                    <QnABoolen>Q&A</QnABoolen>
                </QnABox>
            )}

            <Pressable
                style={{
                    width: '100%',
                    paddingLeft: isEven ? 2 : 2,
                    paddingRight: isEven ? 2 : 2,
                    alignItems: 'center',
                }}
                onPress={() =>
                    navigation.navigate('MainStack', {
                        screen: 'Detail',
                        params: item,
                    })
                }
            >
                <FeedDetail numberOfLines={3} ellipsizeMode="tail">
                    {item.description}
                </FeedDetail>
                <LinearGradientBox
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']}
                    style={{
                        width: '100%',
                        height: item.dimensions.height - 50,
                        marginBottom: item.dimensions.margin,
                    }}
                />
                <Image
                    source={{ uri: item.image }}
                    isEven={isEven}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: item.dimensions.height,
                        borderRadius: 12, // 보더의 모서리 둥글기
                    }}
                />
            </Pressable>

            {item.qna_boolen === false && (
                <TotalLikeBox>
                    <IconBox>
                        <MaterialIcons name="pets" size={12} color="rgba(249, 19, 0, 0.8)" />
                    </IconBox>
                    <TotalLike numberOfLines={1} ellipsizeMode="tail">
                        {item.totalLike}
                    </TotalLike>
                </TotalLikeBox>
            )}
            <PetNameTag
                onPress={() => {
                    navigation.navigate('MainStack', {
                        screen: 'UserProfile',
                        params: item,
                    });
                }}
            >
                <PetImageBox>
                    <PetImage source={{ uri: item.userimg }} />
                </PetImageBox>
                <UserName>{item.username}</UserName>
            </PetNameTag>
        </AnimatedContainer>
    );
};

const AnimatedContainer = styled(Animated.View)``;

const QnABox = styled.View`
    background-color: rgba(193, 204, 200, 0.5);
    position: absolute;
    z-index: 1;
    color: #fc8980;
    top: 16px;
    left: 16px;
    width: 30px;
    height: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

const QnABoolen = styled.Text`
    font-size: 10px;
    color: #243e35;
`;

const FeedDetail = styled.Text`
    position: absolute;
    z-index: 2;
    bottom: 26px;
    width: 85%;
    margin: 14px 16px;
    color: #c1ccc8;
    font-size: 12px;
`;

const LinearGradientBox = styled(LinearGradient)`
    position: absolute;
    bottom: 0px;
    z-index: 1;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
`;

const TotalLikeBox = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    z-index: 1;
    bottom: 16px;
    left: 16px;
    width: 40%;
`;

const IconBox = styled.View`
    background-color: rgba(193, 204, 200, 0.2);
    padding: 2px;
    border-radius: 4px;
`;

const TotalLike = styled.Text`
    color: #c1ccc8;
    font-size: 12px;
    margin-left: 4px;
`;

const PetNameTag = styled.TouchableOpacity`
    position: absolute;
    bottom: 16px;
    right: 16px;
    flex-direction: row;
    align-items: center;
    z-index: 1;
`;

const PetImageBox = styled.View`
    background-color: gray;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    justify-content: center;
    align-items: center;
`;

const PetImage = styled.Image`
    border-radius: 100px;
    width: 100%;
    height: 100%;
`;

const UserName = styled.Text`
    color: #c1ccc8;
    font-size: 14px;
    margin-left: 4px;
`;
