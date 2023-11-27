import React from 'react';
import styled from 'styled-components';
import LogoImage from '/Users/drizzle/KingOfPet/src/assets/logo.png';

const StartScreen = () => {
    return (
        <Container>
            <Logo source={LogoImage} />
        </Container>
    );
};

const Container = styled.View`
    background-color: antiquewhite;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Title = styled.Text``;

const Logo = styled.Image`
    width: 350px;
    height: 350px;
`;

export default StartScreen;
