import React from 'react';
import styled from 'styled-components';

const NonePage = ({ type, user }) => {
    return (
        <>
            {user ? (
                <NoneBox
                    style={{
                        paddingTop: '30%',
                    }}
                >
                    <None>아직 작성된 {type}(이)가 없습니다.</None>
                </NoneBox>
            ) : (
                <NoneBox type={type}>
                    <None>아직 작성된 {type}(이)가 없습니다.</None>
                </NoneBox>
            )}
        </>
    );
};

const NoneBox = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding-top: ${(props) => (props.type === '일기' ? '22%' : '30%')};
`;

const None = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: #343c3a;
`;

export default NonePage;
