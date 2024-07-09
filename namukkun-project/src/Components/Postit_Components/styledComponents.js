import styled from 'styled-components';
import bluebackground from '../../Assets/Img/bluebackground.svg';
import yellowbackground from '../../Assets/Img/yellowbackground.svg';
import brownbackground from '../../Assets/Img/brownbackground.svg';

export const ScrollButton = styled.button`
    color: var(--white-006, #E8E8E8);
    font-family: "UhBeeJJIBBABBA";
    width: 109px;
    height: 25px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    margin-left: 13px;
    border: none;
    cursor: pointer;
    border-radius: 25px;
    background: var(--Main-001, #005AFF);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.10);
`;

// 전체 컨테이너 스타일
export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 100vh;
`;

// Post-it 섹션 컨테이너 스타일
export const PostitSectionContainer = styled.div`
    width: 378px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

// Post-it 섹션 스타일
export const PostitSection = styled.div`
    width: 378px;
    flex-grow: 1;
    position: relative;
`;

// 포스티잇 스타일 컴포넌트
const PostitContainerBase = styled.div`
    width: 224px;
    height: 220px;
    border-radius: 16.857px 16.857px 0px 16.857px;
    display: flex;
    position: absolute;
    cursor: move;
    z-index: 1000; // z-index 값을 1000으로 설정하여 모달보다 낮게 유지
    background-color: #f0f0f0; /* 배경색 추가 */
`;

// 각 색상의 포스티잇 스타일
export const BlueContainer = styled(PostitContainerBase)`
    background: url(${bluebackground}) no-repeat center center;
    background-size: cover;
`;

export const YellowContainer = styled(PostitContainerBase)`
    background: url(${yellowbackground}) no-repeat center center;
    background-size: cover;
`;

export const BrownContainer = styled(PostitContainerBase)`
    background: url(${brownbackground}) no-repeat center center;
    background-size: cover;
`;

export const AllPostitContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

export const PostitWriteButtonContainer = styled.div`
    padding-top: 23.24px;
    padding-left: 22px;
    width: 171px;
    height: 147px;
`;

// 포스티잇 내용 스타일
export const PostitContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PostitInfo = styled.div`
    height: 22.938px;
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
`;

export const PostWriting = styled.div`
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    width: 171px;
    height: 120px;
    font-weight: 400;
    line-height: 20px;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    padding-top: 10px;
`;

// 이동 버튼 스타일
export const MoveButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    width: 67px;
    height: 30px;
    padding: 0;
    margin: 0;
`;

export const DeleteButtonContainer = styled.div`
    padding-left: 4px;
    padding-top: 15px;
    width: 10px;
    display: flex;
`;

export const DeleteButton = styled.button`
    width: 10px;
    height: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    margin: 0;
`;

// 메인 컨텐츠 컨테이너 스타일
export const ContentContainer = styled.div`
    width: 684px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

// 댓글 입력 컨테이너 스타일
export const CommentInputContainer = styled.div`
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 77px;
    border-radius: 15px;
    background: rgba(0, 90, 255, 0.06);
    margin-top: 10px;
    display: flex;
    align-items: center;
`;

// 댓글 입력 필드 스타일 (textarea 사용)
export const CommentInput = styled.textarea`
    all: unset;
    width: 553px;
    margin-right: 20px;
    margin-left: 26px;
    border-radius: 5px;
    color: var(--gray-007, #393939);
    font-family: "MinSans-Regular";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    resize: none; /* 사용자가 크기를 조절할 수 없도록 */
    overflow: hidden; /* 스크롤바가 나타나지 않도록 */

    &::placeholder {
        font-family: "MinSans-Regular";
        color: #A0AEC9;
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 22.5px */
    }
`;

// 댓글 추가 버튼 스타일
export const CommentButton = styled.button`
    padding-right: 12px;
    background: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

// 댓글 표시 컨테이너 스타일
export const CommentsDisplayContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
`;

// 개별 댓글 컨테이너 스타일
export const CommentContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;
    word-wrap: break-word; /* 긴 단어가 자동으로 줄 바꿈되도록 */
`;

// 댓글 스타일
export const CommentDisplayBox = styled.div`
    flex: 1;
    padding-top: 13px;
    padding-bottom: 12px;
    border-radius: var(--Corner-Medium, 12px);
    background: var(--white-005, #F5F5F5);
    align-items: center;
    display: flex;
`;

export const Comment = styled.div`
    margin-left: 28px;
    display: flex;
    width: 553px;
    flex-direction: column;
    justify-content: center;
    line-height: 150%; /* 21px */
`;

// 댓글 헤더 스타일 (이름, 지역, 날짜, 추천수 표시)
export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;

// 댓글 정보 스타일 (이름, 지역, 날짜)
export const CommentInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CommentNameRegion = styled.div`
    color: #000;
    font-family: "MinSans-Regular";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
`;

export const CommentDate = styled.div`
    color: var(--gray-004, #959595);
    font-family: "MinSans-Regular";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
`;

// 댓글 추천 스타일
export const CommentLikes = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const LikeContianer = styled.div`
    display: flex;
    align-items: center;
`;

// 추천 버튼 스타일
export const LikeButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-right: 5px;
`;

// 추천 수 스타일
export const LikeCount = styled.div`
    width: 35px;
    font-size: 14px;
`;

// 댓글 타이틀 스타일
export const CommentTitle = styled.div`
    padding-top: 136px;
    color: #000;
    font-family: "MinSans-Regular";
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 33px;
`;

export const NotMyComment = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MyComment = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CommentDisplayButtonContainer = styled.div`
    display: flex;
    align-items: stretch; /* CommentDisplayBox와 높이를 맞추기 위해 추가 */
    margin-bottom: 6px;
`;

export const TakeButton = styled.div`
    margin-left: 6px;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 63px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${props => props.isTaken ? '#d3d3d3' : '#96B948'};
    background: ${props => props.isTaken ? '#AFCD6D' : 'rgba(175, 205, 109, 0.06)'};
    cursor: pointer;

    ${props => !props.isTaken && `
        &:hover {
            background: rgba(175, 205, 109, 0.30);
        }
    `}
`;

export const TakenButtonText = styled.div`
    padding-top: 4px;
    color: ${props => props.isTaken ? 'var(--white-001, #FFF)' : '#96B948'};
    text-align: center;
    font-family: "MinSans-Regular";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
`;

// 댓글 삭제 버튼 스타일
export const CommentDeleteButton = styled.button`
    display: flex;
    width: 46px;
    height: 25px;
    padding: 7px;
    justify-content: center;
    border-radius: 5px;
    background: rgba(0, 90, 255, 0.06);
    align-items: center;
    border: none;
    cursor: pointer;
    font-family: "MinSans-Regular";
    font-size: 14px;
    margin-bottom: 50px; /* 버튼 간격을 위해 추가 */
    color: var(--Main-001, #005AFF);
    text-align: center;
    font-size: 10.236px;
    font-style: normal;
    font-weight: 500;
    line-height: 21.934px; /* 214.286% */
`;

// 모달 스타일
export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 7000; // z-index 값을 1100으로 설정
`;

export const ModalContent = styled.div`
    width: 420px;   
    height: 240px;
    background: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const ModalTitle = styled.div`
    padding-top: 35px;
    color: var(--gray-008, #191919);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    padding-bottom: 15px;
`

export const ModalSubText = styled.div`
    width: 274px;
    color: var(--gray-005, #707070);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; /* 187.5% */
`

export const ModalButtonContainer = styled.div`
    margin-top: 25.35px;
    height: 32px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 4px;
    margin-right: 29px;
`

export const ModalButton = styled.button`
    display: flex;
    padding: 10px;
    height: 32px;
    justify-content: center;
    border-radius: var(--Corner-Full, 1000px);
    border: 1px solid var(--gray-002, #C7C7C7);
    background: var(--white-001, #FFF);
    align-items: center;

    &:hover {
        border: 1px solid var(--gray-002, #005AFF);
        background: var(--Main-001, #005AFF);
        color: #FFF;
    }
`;
