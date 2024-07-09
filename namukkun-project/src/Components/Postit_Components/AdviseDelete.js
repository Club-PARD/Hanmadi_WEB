import React, { useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from '../../Assets/Style/theme';
import DeleteModal from "./DeleteModal";
import { useParams, useNavigate } from 'react-router-dom';

function AdviseDelete() {
    const { postId } = useParams(); // URL에서 postId를 가져옴
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [isWModalOpen, setIsWModalOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleWModalOpen = () => {
        setIsWModalOpen(true);
    };

    const handleWModalClose = () => {
        setIsWModalOpen(false);
    };

    const handleModifyClick = () => {
        navigate(`/modify/${postId}`); // 수정 페이지로 이동
    };

    return (
        <Div>
            <GlobalStyle />
            <AdvDelBtuContainer>
                <AdviseButton onClick={handleModifyClick}>수정</AdviseButton>
                <DeleteButton onClick={handleWModalOpen}>삭제</DeleteButton>
            </AdvDelBtuContainer>
            <DeleteModal 
                isOpen={isWModalOpen} 
                closeModal={handleWModalClose} 
                postId={postId} 
                setUpdate={setUpdate} 
                update={update} 
            />
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
    justify-content: flex-start;
    padding-left: 91px;
    gap: 10px;
    flex-direction: row;
    align-items: center;
    height: 30px;
    padding-top: 65px;
    padding-bottom: 22px;
`;

const AdviseButton = styled.button`
    display: flex;
    width: 63px;
    height: 33px;
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
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;

const DeleteButton = styled.button`
    display: flex;
    width: 63px;
    height: 33px;
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
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap; /* 줄 바꿈 방지 */
`;
