import React, { useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from '../../Assets/Style/theme';

function AdviseDelete() {


    return (
    <Div>
        <GlobalStyle/>
            <AdvDelBtuContainer>
                <AdviseButton>수정</AdviseButton>
                <DeleteButton>삭제</DeleteButton>
            </AdvDelBtuContainer>
    </Div>
    );
}

export default AdviseDelete;

const Div = styled.div`
    justify-content: center;
`;

const AdvDelBtuContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    height: 30px;
`

const AdviseButton = styled.button`
    display: flex;
    width: 38px;
    height: 20px;
    padding: 5.849px;
    justify-content: center;
    align-items: center;
    gap: 5.849px;
    border-radius: var(--Corner-Extra-small, 4px);
    background: var(--white-006, #E8E8E8);
    border: none;
    color: var(--gray-005, #707070);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const DeleteButton = styled.button`
    display: flex;
    width: 38px;
    height: 20px;
    padding: 5.849px;
    justify-content: center;
    align-items: center;
    gap: 5.849px;
    border-radius: var(--Corner-Extra-small, 4px);
    background: rgba(0, 90, 255, 0.06);
    border: none;
    color: var(--Main-001, #005AFF);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;