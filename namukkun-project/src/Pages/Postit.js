import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Draggable from 'react-draggable';
import Header from "../Components/Layout_Components/Header";
import DetailContent from "../Components/Postit_Components/DetailContent";
import sendcomment from '../Assets/Img/sendcomment.svg';
import commentlike from '../Assets/Img/commentlike.svg';
import aftercommentlike from '../Assets/Img/aftercommentlike.svg';
import { GlobalStyle } from '../Assets/Style/theme';
import takenduck from '../Assets/Img/takenduck.svg';
import nextbutton from '../Assets/Img/nexbutton.svg';
import close from '../Assets/Img/close.svg';
import bluebackground from '../Assets/Img/bluebackground.svg';
import yellowbackground from '../Assets/Img/yellowbackground.svg';
import brownbackground from '../Assets/Img/brownbackground.svg';
import aftertaken from '../Assets/Img/aftertaken.svg';
import { fetchComments, deleteComment, createComment, toggleLikeComment, toggleTakeComment } from '../API/AxiosAPI'; // Axios API 코드 임포트

const intToRegion = {
    0: '경산시',
    1: '경주시',
    2: '구미시',
    3: '김천시',
    4: '문경시',
    5: '상주시',
    6: '안동시',
    7: '영주시',
    8: '영천시',
    9: '포항시'
};

function Postit() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [leftPostits, setLeftPostits] = useState([]);
    const [rightPostits, setRightPostits] = useState([]);
    const commentInputRef = useRef(null);
    const leftPostitsRef = useRef(null);
    const rightPostitsRef = useRef(null);
    const commentRefs = useRef([]); // 각 댓글에 대한 ref를 저장할 배열
    const [designIndex, setDesignIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [isTakeModalOpen, setIsTakeModalOpen] = useState(false); // 새로운 모달 상태 추가
    const [postitToDelete, setPostitToDelete] = useState(null);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [commentToTake, setCommentToTake] = useState(null); // 새로운 상태 추가
    const [highestZIndex, setHighestZIndex] = useState(1000);
    const userId = 4; // 실제 사용자 ID를 여기에 설정합니다.

    useEffect(() => {
        const postId = 1; // 여기에 실제 postId를 넣어야 합니다.
        const loadComments = async () => {
            try {
                const commentsData = await fetchComments(postId, userId);
                setComments(commentsData);
                const initialZIndex = Math.max(...commentsData.map(comment => comment.zIndex)) + 1;
                setHighestZIndex(initialZIndex);

                setLeftPostits(commentsData.filter(comment => comment.section === 'left' && comment.isTaken));
                setRightPostits(commentsData.filter(comment => comment.section === 'right' && comment.isTaken));
            } catch (error) {
                console.error('Error loading comments:', error);
            }
        };

        loadComments();
    }, []);

    const handleAddComment = async () => {
        if (newComment.trim()) {
            const postId = 1; // 여기에 실제 postId를 넣어야 합니다.
            try {
                const newCommentData = await createComment(postId, userId, newComment);
                // 서버에서 받은 newCommentData를 수정해 상태 업데이트
                const updatedNewComment = {
                    id: newCommentData.id,
                    name: "사용자",
                    region: 9,
                    date: new Date().toLocaleString(),
                    upCounter: 0,
                    content: newComment, // 새로운 댓글 내용을 직접 설정
                    position: { x: 0, y: 0 },
                    design: designIndex,
                    isTaken: false,
                    zIndex: highestZIndex,
                    section: "left",
                    liked: false // 초기 liked 상태를 false로 설정
                };
                setComments([...comments, updatedNewComment]);
                setNewComment('');
                setDesignIndex((designIndex + 1) % 3);
                setHighestZIndex(highestZIndex + 1);
                // 새로운 포스티잇이 추가된 위치로 스크롤 이동
                if (updatedNewComment.section === "left") {
                    leftPostitsRef.current.scrollIntoView({ behavior: 'smooth' });
                } else {
                    rightPostitsRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const adjustTextareaHeight = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleUp = async (index) => {
        const commentId = comments[index].id;
        try {
            await toggleLikeComment(commentId, userId);
            const updatedComments = [...comments];
            if (updatedComments[index].liked) {
                updatedComments[index].upCounter -= 1;
                updatedComments[index].liked = false;
            } else {
                updatedComments[index].upCounter += 1;
                updatedComments[index].liked = true;
            }
            setComments(updatedComments);
        } catch (error) {
            console.error('Error toggling like comment:', error);
        }
    };

    useEffect(() => {
        if (commentInputRef.current) {
            commentInputRef.current.style.height = "auto";
            commentInputRef.current.style.height = `${commentInputRef.current.scrollHeight}px`;
        }
    }, [newComment]);

    const handleTakeButtonClick = (comment) => {
        setCommentToTake(comment);
        setIsTakeModalOpen(true);
    };

    const confirmTakeComment = async () => {
        const comment = commentToTake;
        setIsTakeModalOpen(false);

        try {
            await toggleTakeComment(comment.id, userId, !comment.isTaken);
            const updatedComments = comments.map((c) => 
                c.id === comment.id ? { ...c, isTaken: !c.isTaken } : c
            );

            setComments(updatedComments);

            if (comment.isTaken) {
                // 포스티잇 삭제
                setLeftPostits(leftPostits.filter(postit => postit.id !== comment.id));
                setRightPostits(rightPostits.filter(postit => postit.id !== comment.id));
            } else {
                // 포스티잇 추가
                const newPostit = { ...comment, design: designIndex, isTaken: true, zIndex: highestZIndex };
                if (newPostit.section === "left") {
                    setLeftPostits([...leftPostits, newPostit]);
                    leftPostitsRef.current.scrollIntoView({ behavior: 'smooth' });
                } else {
                    setRightPostits([...rightPostits, newPostit]);
                    rightPostitsRef.current.scrollIntoView({ behavior: 'smooth' });
                }
                setDesignIndex((designIndex + 1) % 3);
                setHighestZIndex(highestZIndex + 1);
            }
        } catch (error) {
            console.error('Error toggling take comment:', error);
        }
    };

    const movePostit = (id, fromLeftToRight) => {
        if (fromLeftToRight) {
            const postitToMove = leftPostits.find(postit => postit.id === id);
            if (postitToMove) {
                setLeftPostits(leftPostits.filter(postit => postit.id !== id));
                setRightPostits([...rightPostits, { ...postitToMove, section: "right" }]);
            }
        } else {
            const postitToMove = rightPostits.find(postit => postit.id === id);
            if (postitToMove) {
                setRightPostits(rightPostits.filter(postit => postit.id !== id));
                setLeftPostits([...leftPostits, { ...postitToMove, section: "left" }]);
            }
        }
    };

    const openDeleteModal = (postit) => {
        setPostitToDelete(postit);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setPostitToDelete(null);
        setCommentToDelete(null);
        setIsModalOpen(false);
    };

    const closeLimitModal = () => {
        setIsLimitModalOpen(false);
    };

    const confirmDeletePostit = () => {
        if (postitToDelete) {
            setLeftPostits(leftPostits.filter(postit => postit.id !== postitToDelete.id));
            setRightPostits(rightPostits.filter(postit => postit.id !== postitToDelete.id));

            setComments(comments.map(comment => 
                comment.id === postitToDelete.id ? { ...comment, isTaken: false, section: "left" } : comment
            ));
        }
        closeDeleteModal();
    };

    const bringToFront = (id) => {
        setLeftPostits(leftPostits.map(postit => 
            postit.id === id ? { ...postit, zIndex: highestZIndex } : postit
        ));
        setRightPostits(rightPostits.map(postit => 
            postit.id === id ? { ...postit, zIndex: highestZIndex } : postit
        ));
        setHighestZIndex(highestZIndex + 1);
    };

    const handleCommentDelete = (userid, commentid) => {
        setCommentToDelete({ userid, commentid });
        setIsModalOpen(true);
    };

    const confirmDeleteComment = async () => {
        if (commentToDelete) {
            try {
                await deleteComment(commentToDelete.userid, commentToDelete.commentid);
                setComments(comments.filter(comment => comment.id !== commentToDelete.commentid));
                setCommentToDelete(null);
                closeDeleteModal();
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    const handleScrollToComment = (index) => {
        if (commentRefs.current[index]) {
            commentRefs.current[index].scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <GlobalStyle />
            <MainContainer>
                <PostitSectionContainer ref={leftPostitsRef}>
                    <PostitSection>
                        {leftPostits.map((postit) => (
                            <DraggablePostit
                                key={postit.id}
                                postit={postit}
                                onMove={() => movePostit(postit.id, true)}
                                onDelete={() => openDeleteModal(postit)}
                                onStart={() => bringToFront(postit.id)}
                                onScrollToComment={() => handleScrollToComment(comments.findIndex(comment => comment.id === postit.id))}
                            />
                        ))}
                    </PostitSection>
                </PostitSectionContainer>
                <ContentContainer>
                    <DetailContent />
                    <CommentTitle>한마디 거들기💬</CommentTitle>
                    <CommentInputContainer>
                        <CommentInput
                            ref={commentInputRef}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onInput={adjustTextareaHeight}
                            placeholder="작성한 댓글이 해당 글 작성자에 의해 채택될 경우, 삭제가 불가능하니 따뜻한 댓글 부탁해요!"
                            rows={1}
                        />
                        <CommentButton onClick={handleAddComment}>
                            <img src={sendcomment} alt='sendcomment' style={{ width: '40px', height: '40px' }} />
                        </CommentButton>
                    </CommentInputContainer>
                    <NotMyComment>
                        <CommentsDisplayContainer>
                            {comments.map((comment, index) => (
                                <CommentContainer key={index} ref={el => commentRefs.current[index] = el}>
                                    <CommentHeader>
                                        <CommentInfo>
                                            <CommentNameRegion>{comment.name} / {intToRegion[comment.region]}</CommentNameRegion>
                                            <CommentDate>{comment.date}</CommentDate>
                                        </CommentInfo>
                                        <CommentLikes>
                                            <LikeButton onClick={() => handleUp(index)}>
                                                <LikeContianer>
                                                    <img src={comment.liked ? aftercommentlike : commentlike} alt="commentlike" style={{ width: '16.63px', height: '14.25px' }} />
                                                </LikeContianer>
                                            </LikeButton>
                                            <LikeCount>{comment.upCounter}</LikeCount>
                                        </CommentLikes>
                                    </CommentHeader>
                                    <CommentDisplayButtonContainer>
                                        <CommentDisplayBox>
                                            <Comment>{comment.content}</Comment>
                                        </CommentDisplayBox>
                                        <TakeButton 
                                            isTaken={comment.isTaken} 
                                            onClick={() => handleTakeButtonClick(comment)}
                                        >
                                            <img 
                                                src={comment.isTaken ? aftertaken : takenduck} 
                                                alt="takenduck" 
                                                style={{ width: '15px', height: '19px' }} 
                                            />
                                            <TakenButtonText isTaken={comment.isTaken}>{comment.isTaken ? "해제하기" : "채택하기"}</TakenButtonText>
                                        </TakeButton>
                                    </CommentDisplayButtonContainer>
                                    <CommentDeleteButton onClick={() => handleCommentDelete(comment.userId, comment.id)}>
                                        삭제
                                    </CommentDeleteButton>
                                </CommentContainer>
                            ))}
                        </CommentsDisplayContainer>
                    </NotMyComment>
                </ContentContainer>
                <PostitSectionContainer ref={rightPostitsRef}>
                    <PostitSection>
                        {rightPostits.map((postit) => (
                            <DraggablePostit
                                key={postit.id}
                                postit={postit}
                                onMove={() => movePostit(postit.id, false)}
                                onDelete={() => openDeleteModal(postit)}
                                onStart={() => bringToFront(postit.id)}
                                onScrollToComment={() => handleScrollToComment(comments.findIndex(comment => comment.id === postit.id))}
                            />
                        ))}
                    </PostitSection>
                </PostitSectionContainer>
            </MainContainer>
            {isModalOpen && (
                <Modal>
                    <ModalContent>
                        <ModalTitle>
                            {commentToDelete ? "정말 삭제하시겠어요?" : "채택을 해제하시겠어요?"}
                        </ModalTitle>
                        <ModalSubText>
                            {commentToDelete 
                                ? "삭제된 댓글은 되돌릴 수 없어요."
                                : <>채택이 해제된 댓글은 <br />댓글창에서 그대로 확인할 수 있어요."</>
                            }
                        </ModalSubText>
                        <ModalButtonContainer>
                            <ModalButton onClick={closeDeleteModal}>&nbsp;취소하기&nbsp;</ModalButton>
                            <ModalButton onClick={commentToDelete ? confirmDeleteComment : confirmDeletePostit}>&nbsp;확인&nbsp;</ModalButton>
                        </ModalButtonContainer>
                    </ModalContent>
                </Modal>
            )}
            {isLimitModalOpen && (
                <Modal>
                    <ModalContent>
                        <ModalTitle>
                            포스티잇 한도가 초과되었습니다!
                        </ModalTitle>
                        <ModalSubText>
                            포스티잇은 최대 10개까지만 추가할 수 있습니다.
                        </ModalSubText>
                        <ModalButtonContainer>
                            <ModalButton onClick={closeLimitModal}>&nbsp;확인&nbsp;</ModalButton>
                        </ModalButtonContainer>
                    </ModalContent>
                </Modal>
            )}
            {isTakeModalOpen && (
                <Modal>
                    <ModalContent>
                        <ModalTitle>
                            {commentToTake.isTaken ? "채택을 해제하시겠어요?" : "이 댓글을 채택하시겠어요?"}
                        </ModalTitle>
                        <ModalSubText>
                            {commentToTake.isTaken 
                                ? "채택이 해제된 댓글은 댓글창에서 그대로 확인할 수 있어요."
                                : "채택이 해제된 댓글은 댓글창에서 그대로 확인할 수 있어요."
                            }
                        </ModalSubText>
                        <ModalButtonContainer>
                            <ModalButton onClick={() => setIsTakeModalOpen(false)}>&nbsp;취소하기&nbsp;</ModalButton>
                            <ModalButton onClick={confirmTakeComment}>&nbsp;확인&nbsp;</ModalButton>
                        </ModalButtonContainer>
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
}

const DraggablePostit = ({ postit, onMove, onDelete, onStart, onScrollToComment }) => {
    const [position, setPosition] = useState(postit.position);

    const handleStop = (e, data) => {
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        postit.position = newPosition;
    };

    let PostitStyledContainer;
    switch (postit.design) {
        case 0:
            PostitStyledContainer = BlueContainer;
            break;
        case 1:
            PostitStyledContainer = YellowContainer;
            break;
        case 2:
            PostitStyledContainer = BrownContainer;
            break;
        default:
            PostitStyledContainer = BlueContainer;
            break;
    }

    return (
        <Draggable
            bounds="parent"
            position={position}
            onStart={onStart}
            onStop={handleStop}
        >
            <PostitStyledContainer style={{ zIndex: postit.zIndex }}>
                <AllPostitContainer>
                    <PostitWriteButtonContainer>
                        <PostitContent>
                            <PostitInfo>{postit.name} / {intToRegion[postit.region]}</PostitInfo>
                            <PostWriting>{postit.content}</PostWriting>
                        </PostitContent>
                        <ButtonContainer>
                            <MoveButton onClick={onMove}>
                                <img src={nextbutton} alt='nextbutton' style={{ width: '67px', height: '30px' }}/>
                            </MoveButton>
                            <ScrollButton onClick={onScrollToComment}>댓글 보러가기</ScrollButton>
                        </ButtonContainer>
                    </PostitWriteButtonContainer>
                    <DeleteButtonContainer>
                        <DeleteButton onClick={onDelete}>
                            <img src={close} alt='close' style={{ width: '10px', height: '10px' }}/>
                        </DeleteButton>
                    </DeleteButtonContainer>
                </AllPostitContainer>
            </PostitStyledContainer>
        </Draggable>
    );
};

export default Postit;

// 스타일 컴포넌트는 기존 코드 그대로 사용
// 아래 생략된 코드에서는 기존에 제공된 스타일 컴포넌트를 사용하세요.

const ScrollButton = styled.button`
    width: 109px;
    font-family: 'UhBeeJJIBBABBA';
    height: 24px;
    flex-shrink: 0;
    margin-left: 11px;
    color: #ffffff;
    border: none;
    cursor: pointer;
    border-radius: 25px;
    background: var(--Main-001, #005AFF);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.10);
`;



// 전체 컨테이너 스타일
const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 100vh;
`;

// Post-it 섹션 컨테이너 스타일
const PostitSectionContainer = styled.div`
    width: 378px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

// Post-it 섹션 스타일
const PostitSection = styled.div`
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
`;

const BlueContainer = styled(PostitContainerBase)`
    background: url(${bluebackground}) no-repeat center center;
    background-size: cover;
`;

const YellowContainer = styled(PostitContainerBase)`
    background: url(${yellowbackground}) no-repeat center center;
    background-size: cover;
`;

const BrownContainer = styled(PostitContainerBase)`
    background: url(${brownbackground}) no-repeat center center;
    background-size: cover;
`;

const AllPostitContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const PostitWriteButtonContainer = styled.div`
    padding-top: 23.24px;
    padding-left: 22px;
    width: 171px;
    height: 147px;
`;

// 포스티잇 내용 스타일
const PostitContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostitInfo = styled.div`
    height: 22.938px;
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
`;

const PostWriting = styled.div`
    color: var(--gray-007, #393939);
    font-family: 'MinSans-Regular';
    font-size: 12px;
    font-style: normal;
    width: 171px;
    height: 120px;
    font-weight: 400;
    line-height: 20px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    padding-top: 10px;
`;

// 이동 버튼 스타일
const MoveButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    width: 67px;
    height: 30px;
    padding: 0;
    margin: 0;
`;

const DeleteButtonContainer = styled.div`
    padding-left: 4px;
    padding-top: 15px;
    width: 10px;
    display: flex;
`;

const DeleteButton = styled.button`
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
const ContentContainer = styled.div`
    width: 684px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

// 댓글 입력 컨테이너 스타일
const CommentInputContainer = styled.div`
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
const CommentInput = styled.textarea`
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
        font-family: "Min Sans";
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 22.5px */
    }
`;

// 댓글 추가 버튼 스타일
const CommentButton = styled.button`
    padding-right: 12px;
    background: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

// 댓글 표시 컨테이너 스타일
const CommentsDisplayContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
`;

// 개별 댓글 컨테이너 스타일
const CommentContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;
    word-wrap: break-word; /* 긴 단어가 자동으로 줄 바꿈되도록 */
`;

// 댓글 스타일
const CommentDisplayBox = styled.div`
    flex: 1;
    padding-top: 13px;
    padding-bottom: 12px;
    border-radius: var(--Corner-Medium, 12px);
    background: var(--white-005, #F5F5F5);
    align-items: center;
    display: flex;
`;

const Comment = styled.div`
    margin-left: 28px;
    display: flex;
    width: 553px;
    flex-direction: column;
    justify-content: center;
    line-height: 150%; /* 21px */
`;

// 댓글 헤더 스타일 (이름, 지역, 날짜, 추천수 표시)
const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
`;

// 댓글 정보 스타일 (이름, 지역, 날짜)
const CommentInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const CommentNameRegion = styled.div`
    color: #000;
    font-family: "MinSans-Regular";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
`;

const CommentDate = styled.div`
    color: var(--gray-004, #959595);
    font-family: "MinSans-Regular";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
`;

// 댓글 추천 스타일
const CommentLikes = styled.div`
    display: flex;
    align-items: flex-end;
`;

const LikeContianer = styled.div`
    display: flex;
    align-items: center;
`;

// 추천 버튼 스타일
const LikeButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-right: 5px;
`;

// 추천 수 스타일
const LikeCount = styled.div`
    width: 22.75px;
    font-size: 14px;
`;

// 댓글 타이틀 스타일
const CommentTitle = styled.div`
    padding-top: 136px;
    color: #000;
    font-family: "MinSans-Regular";
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 33px;
`;

const NotMyComment = styled.div`
    display: flex;
    flex-direction: column;
`;

const MyComment = styled.div`
    display: flex;
    flex-direction: column;
`;

const CommentDisplayButtonContainer = styled.div`
    display: flex;
    align-items: stretch; /* CommentDisplayBox와 높이를 맞추기 위해 추가 */
    margin-bottom: 6px;
`;

const TakeButton = styled.div`
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

const TakenButtonText = styled.div`
    padding-top: 4px;
    color: ${props => props.isTaken ? 'var(--white-001, #FFF)' : '#96B948'};
    text-align: center;
    font-family: "MinSans-Regular";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
`;

// 댓글 삭제 버튼 스타일
const CommentDeleteButton = styled.button`
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
const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100; // z-index 값을 1100으로 설정
`;

const ModalContent = styled.div`
    width: 420px;   
    height: 240px;
    background: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ModalTitle = styled.div`
    padding-top: 35px;
    color: var(--gray-008, #191919);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    padding-bottom: 15px;
`

const ModalSubText = styled.div`
    width: 274px;
    color: var(--gray-005, #707070);
    text-align: center;
    font-family: 'MinSans-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px; /* 187.5% */
`

const ModalButtonContainer = styled.div`
    margin-top: 25.35px;
    height: 32px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 4px;
    margin-right: 29px;
`

const ModalButton = styled.button`
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
