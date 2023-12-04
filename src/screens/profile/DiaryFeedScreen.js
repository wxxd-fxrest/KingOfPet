import React from 'react';
import styled from 'styled-components';

const DiaryFeedScreen = ({ handleScroll }) => {
    return (
        <Container onScroll={handleScroll}>
            <Title> DiaryFeedScreen </Title>
        </Container>
    );
};

const Container = styled.ScrollView`
    flex: 1;
    background-color: #f9f9f7;
    padding: 20px;
`;

const Title = styled.Text``;

export default DiaryFeedScreen;
