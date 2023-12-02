import React, { useState } from 'react';
import styled from 'styled-components';
import MasonryList from 'react-native-masonry-list';
import postData from '../../data/postData';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RandomFeedScreen = () => {
    const spacing = 1;

    // 랜덤한 dimensions 값을 생성하는 함수
    const generateRandomDimensions = () => {
        const width = Math.floor(Math.random() * 200) + 100; // 최소 100, 최대 300
        const height = Math.floor(Math.random() * 200) + 100; // 최소 100, 최대 300
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
            <MasonryList
                images={dataWithDimensions.map((item) => ({ uri: item.image, data: item }))}
                columns={2}
                spacing={spacing}
                backgroundColor="#f9f9f7"
                showsVerticalScrollIndicator={false}
                onPressImage={(item, index) => console.log(item, index)}
                renderIndividualHeader={(props) => {
                    return (
                        <>
                            {props.data.qna_boolen === true && (
                                <QnABox>
                                    <QnABoolen>Q&A</QnABoolen>
                                </QnABox>
                            )}
                            <FeedDetail numberOfLines={3} ellipsizeMode="tail">
                                {props.data.description}
                            </FeedDetail>
                        </>
                    );
                }}
                renderIndividualFooter={(props) => {
                    return (
                        <>
                            <PetNameTag>
                                <PetImageBox>
                                    <PetImage source={{ uri: props.data.userimg }} />
                                </PetImageBox>
                                <UserName>{props.data.username}</UserName>
                            </PetNameTag>
                        </>
                    );
                }}
                customImageComponent={(props) => {
                    return (
                        <View style={{ alignItems: 'center' }}>
                            <LinearGradientBox
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']}
                                style={{
                                    width: props.style.width - spacing,
                                    height: props.style.height - 50,
                                    marginBottom: props.style.margin,
                                }}
                            />
                            <Image
                                {...props}
                                style={{
                                    ...props.style,
                                    borderRadius: 12, // 보더의 모서리 둥글기
                                }}
                            />
                        </View>
                    );
                }}
            />
        </Container>
    );
};

const Container = styled.View`
    background-color: #f9f9f7;
    flex: 1;
    padding: 4px 0px;
`;

const LinearGradientBox = styled(LinearGradient)`
    position: absolute;
    bottom: 0px;
    z-index: 1;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
`;

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
    z-index: 1;
    bottom: 26px;
    width: 90%;
    margin: 12px;
    color: #c1ccc8;
    font-size: 12px;
`;

const PetNameTag = styled.View`
    position: absolute;
    bottom: 16px;
    right: 16px;
    flex-direction: row;
    align-items: center;
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

export default RandomFeedScreen;
