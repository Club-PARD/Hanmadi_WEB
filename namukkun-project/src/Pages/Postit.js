import React, { useState, useRef, useEffect } from "react";
import {
    MainContainer, PostitSectionContainer, PostitSectionLeft, PostitSectionRight,
    ContentContainer, CommentTitle, CommentInputContainer,
    CommentInput, CommentButton, CommentsDisplayContainer, CommentContainer,
    CommentHeader, CommentInfo, CommentNameRegion, CommentDate, CommentLikes,
    LikeButton, LikeContianer, LikeCount, CommentDisplayBox, Comment,
    CommentDisplayButtonContainer, TakeButton, TakenButtonText, CommentDeleteButton,
    ScrollButton, Modal, ModalContent, ModalTitle, ModalSubText, ModalButtonContainer,
    ModalButton, NotMyComment
} from '../Components/Postit_Components/styledComponents';
import DraggablePostit from '../Components/Postit_Components/DraggablePostit';
import { useParams } from "react-router-dom";
import {
    fetchComments, deleteComment, createComment, toggleLikeComment,
    toggleTakeComment, fetchPostits, createPostit, deletePostit, movePostit,
    movePostitSection, getUserInfo
} from '../API/AxiosAPI';
import DetailContent from "../Components/Postit_Components/DetailContent";
import sendcomment from '../Assets/Img/sendcomment.svg';
import aftercommentlike from '../Assets/Img/aftercommentlike.svg';
import commentlike from '../Assets/Img/commentlike.svg';
import aftertaken from '../Assets/Img/aftertaken.svg';
import takenduck from '../Assets/Img/takenduck.svg';
import AdviseDelete from '../Components/Postit_Components/AdviseDelete';


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
    const { postId } = useParams();  // useParams를 사용하여 postId를 가져옴
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [leftPostits, setLeftPostits] = useState([]);
    const [rightPostits, setRightPostits] = useState([]);
    const [recentPostit, setRecentPostit] = useState(null);
    const commentInputRef = useRef(null);
    const leftPostitsRef = useRef(null);
    const rightPostitsRef = useRef(null);
    const commentRefs = useRef([]);
    const [designIndex, setDesignIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [isTakeModalOpen, setIsTakeModalOpen] = useState(false);
    const [postitToDelete, setPostitToDelete] = useState(null);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [commentToTake, setCommentToTake] = useState(null);
    const [highestZIndex, setHighestZIndex] = useState(1000);
    const userId = 1;

    useEffect(() => {
        const loadCommentsAndPostits = async () => {
            try {
                const [commentsData, postitsData, userInfo] = await Promise.all([
                    fetchComments(postId), 
                    fetchPostits(postId), 
                    getUserInfo(userId)
                ]);

                const likedComments = userInfo.commentUpList || [];

                // 댓글을 commentId 내림차순으로 정렬하여 최신 댓글이 위로 오게 함
                const sortedComments = commentsData.sort((a, b) => b.id - a.id).map(comment => ({
                    ...comment,
                    liked: likedComments.includes(comment.id),
                    nickname: comment.userInfoDTO.nickName,
                    local: comment.userInfoDTO.local,
                    commentTime: new Date(comment.commentTime).toLocaleDateString()
                }));

                const sortedPostits = postitsData.sort((a, b) => a.z - b.z).map(postit => {
                    const comment = sortedComments.find(c => c.id === postit.commentId);
                    return {
                        ...postit,
                        nickname: comment ? comment.nickname : '',
                        local: comment ? comment.local : ''
                    };
                });

                setComments(sortedComments);

                const initialZIndex = sortedPostits.length > 0 ? Math.max(...sortedPostits.map(postit => postit.z)) + 1 : 1000;
                setHighestZIndex(initialZIndex);

                setLeftPostits(sortedPostits.filter(postit => postit.section === 'left'));
                setRightPostits(sortedPostits.filter(postit => postit.section === 'right'));
            } catch (error) {
                console.error('Error loading comments and postits:', error);
            }
        };

        loadCommentsAndPostits();
    }, [userId]);

    const addComment = async () => {
        if (newComment.trim()) {
            try {
                const userInfo = await getUserInfo(userId);
                const newCommentData = await createComment(postId, userId, newComment); // postId를 1로 고정
                if (newCommentData && newCommentData.commentId) {
                    const updatedNewComment = {
                        id: newCommentData.commentId,
                        userId: userId, // 사용자 ID 추가
                        nickname: userInfo.nickName,
                        local: userInfo.local,
                        commentTime: new Date().toLocaleDateString(),
                        upCounter: 0,
                        content: newComment,
                        position: { x: 0, y: 0 },
                        design: designIndex,
                        isTaken: false,
                        zIndex: highestZIndex,
                        section: "right",
                        liked: false
                    };
                    const updatedComments = [updatedNewComment, ...comments];
                    setComments(updatedComments); // 최신 댓글을 가장 위에 추가
                    setNewComment('');
                    setDesignIndex((designIndex + 1) % 3);
                    setHighestZIndex(highestZIndex + 1);
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
        const newLikedStatus = !comments[index].liked;
        try {
            await toggleLikeComment(commentId, userId, newLikedStatus);
            const updatedComments = comments.map(comment => 
                comment.id === commentId ? { ...comment, liked: newLikedStatus, upCounter: comment.upCounter + (newLikedStatus ? 1 : -1) } : comment
            );
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

    useEffect(() => {
        if (recentPostit) {
            const postitElement = document.getElementById(recentPostit.id);
            if (postitElement) {
                postitElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [recentPostit]);

    const handleTakeButtonClick = (comment) => {
        setCommentToTake(comment);
        setIsTakeModalOpen(true);
    };

    const confirmTakeComment = async () => {
        const comment = commentToTake;
        setIsTakeModalOpen(false);

        if (comment.isTaken) {
            const postitToRemove = [...leftPostits, ...rightPostits].find(postit => postit.commentId === comment.id);
            if (postitToRemove) {
                await deletePostit(userId, postitToRemove.postItId);
                setLeftPostits(leftPostits.filter(postit => postit.postItId !== postitToRemove.postItId));
                setRightPostits(rightPostits.filter(postit => postit.postItId !== postitToRemove.postItId));
            }
        } else {
            const designIndex = Math.floor(Math.random() * 3); // 0부터 2까지의 랜덤 숫자 생성
            const newPostit = {
                userId: userId,
                commentId: comment.id,
                design: designIndex,
                section: "right",
                x: 0,
                y: 0,
                z: highestZIndex,
                postId: postId // postId를 1로 고정
            };

            console.log('New postit data:', newPostit);

            try {
                const createdPostit = await createPostit(newPostit, userId);

                if (createdPostit.postItId === null || createdPostit.postItId === undefined) {
                    setIsLimitModalOpen(true);
                    return;
                }

                const updatedNewPostit = {
                    ...comment,
                    design: designIndex,
                    isTaken: true,
                    zIndex: highestZIndex,
                    postItId: createdPostit.postItId,
                    x: newPostit.x,
                    y: newPostit.y,
                    z: newPostit.z,
                    postId: newPostit.postId,
                    commentId: newPostit.commentId
                };

                console.log('Newly created postit:', updatedNewPostit);

                if (updatedNewPostit.section === "left") {
                    setLeftPostits([...leftPostits, updatedNewPostit]);
                } else {
                    setRightPostits([...rightPostits, updatedNewPostit]);
                }

                setRecentPostit(updatedNewPostit);
                setHighestZIndex(highestZIndex + 1);

                // 스크롤을 화면 상단으로 이동
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Error creating postit:', error);
            }
        }

        try {
            await toggleTakeComment(comment.id, userId, !comment.isTaken);
            const updatedComments = comments.map(c => 
                c.id === comment.id ? { ...c, isTaken: !c.isTaken } : c
            );
            setComments(updatedComments);
        } catch (error) {
            console.error('Error toggling take comment:', error);
        }
    };

    const movePostitSectionHandler = async (id, fromLeftToRight) => {
        const postitToMove = fromLeftToRight
            ? leftPostits.find(postit => postit.postItId === id)
            : rightPostits.find(postit => postit.postItId === id);

        if (postitToMove) {
            const newSection = fromLeftToRight ? 'right' : 'left';
            try {
                await movePostitSection(userId, postitToMove.postItId, newSection);
                if (fromLeftToRight) {
                    setLeftPostits(leftPostits.filter(postit => postit.postItId !== id));
                    setRightPostits([...rightPostits, { ...postitToMove, section: newSection }]);
                } else {
                    setRightPostits(rightPostits.filter(postit => postit.postItId !== id));
                    setLeftPostits([...leftPostits, { ...postitToMove, section: newSection }]);
                }
            } catch (error) {
                console.error('Error moving postit section:', error);
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

    const confirmDeletePostit = async () => {
        if (postitToDelete) {
            try {
                console.log('Deleting postit:', postitToDelete);
                await deletePostit(userId, postitToDelete.postItId);

                setLeftPostits(leftPostits.filter(postit => postit.postItId !== postitToDelete.postItId));
                setRightPostits(rightPostits.filter(postit => postit.postItId !== postitToDelete.postItId));

                setComments(comments.map(comment => 
                    comment.id === postitToDelete.commentId ? { ...comment, isTaken: false } : comment
                ));
                await toggleTakeComment(postitToDelete.commentId, userId, false);
                closeDeleteModal();
            } catch (error) {
                console.error('Error deleting postit:', error);
            }
        }
    };

    const bringToFront = async (id) => {
        const postitToFront = [...leftPostits, ...rightPostits].find(postit => postit.postItId === id);

        if (postitToFront) {
            const newZIndex = highestZIndex + 1;
            postitToFront.z = newZIndex;
            setHighestZIndex(newZIndex);

            try {
                await movePostit(postitToFront.userId, {
                    postItId: postitToFront.postItId,
                    postId: postId, // postId를 1로 고정
                    commentId: postitToFront.commentId,
                    userId: postitToFront.userId,
                    x: postitToFront.x,
                    y: postitToFront.y,
                    z: newZIndex
                });

                setLeftPostits(leftPostits.map(postit => 
                    postit.postItId === id ? { ...postit, z: newZIndex } : postit
                ));
                setRightPostits(rightPostits.map(postit => 
                    postit.postItId === id ? { ...postit, z: newZIndex } : postit
                ));
            } catch (error) {
                console.error('Error bringing postit to front:', error);
            }
        }
    };

    const handleCommentDelete = (userid, commentid) => {
        setCommentToDelete({ userid, commentid });
        setIsModalOpen(true);
    };

    const confirmDeleteComment = async () => {
        if (commentToDelete) {
            try {
                await deleteComment(commentToDelete.userid, commentToDelete.commentid);
                const updatedComments = comments.filter(comment => comment.id !== commentToDelete.commentid);
                setComments(updatedComments);
                setLeftPostits(leftPostits.filter(postit => postit.commentId !== commentToDelete.commentid));
                setRightPostits(rightPostits.filter(postit => postit.commentId !== commentToDelete.commentid));
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
            <MainContainer>
                <PostitSectionContainer ref={leftPostitsRef}>
                    <PostitSectionLeft>
                        {leftPostits.map((postit) => (
                            <DraggablePostit
                                key={postit.postItId}
                                postit={postit}
                                onMove={() => movePostitSectionHandler(postit.postItId, true)}
                                onDelete={() => openDeleteModal(postit)}
                                onStart={() => bringToFront(postit.postItId)}
                                onScrollToComment={() => handleScrollToComment(comments.findIndex(comment => comment.id === postit.commentId))}
                                bringToFront={bringToFront}
                            />
                        ))}
                    </PostitSectionLeft>
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
                        <CommentButton onClick={addComment}>
                            <img src={sendcomment} alt='sendcomment' style={{ width: '40px', height: '40px' }} />
                        </CommentButton>
                    </CommentInputContainer>
                    <NotMyComment>
                        <CommentsDisplayContainer>
                            {comments.map((comment, index) => (
                                <CommentContainer key={index} ref={el => commentRefs.current[index] = el}>
                                    <CommentHeader>
                                        <CommentInfo>
                                            <CommentNameRegion>{comment.nickname} / {intToRegion[comment.local]}</CommentNameRegion>
                                            <CommentDate>{comment.commentTime}</CommentDate>
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
                                            <TakenButtonText isTaken={comment.isTaken}>{comment.isTaken ? "포스트잇 UP" : "포스트잇 UP"}</TakenButtonText>
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
                    <AdviseDelete/>
                    <PostitSectionRight>
                        {rightPostits.map((postit) => (
                            <DraggablePostit
                                key={postit.postItId}
                                postit={postit}
                                onMove={() => movePostitSectionHandler(postit.postItId, false)}
                                onDelete={() => openDeleteModal(postit)}
                                onStart={() => bringToFront(postit.postItId)}
                                onScrollToComment={() => handleScrollToComment(comments.findIndex(comment => comment.id === postit.commentId))}
                                bringToFront={bringToFront}
                            />
                        ))}
                    </PostitSectionRight>
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
                                : <>채택이 해제된 댓글은<br/> 댓글창에서 그대로 확인할 수 있어요.</>
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
                            포스트잇 한도가 초과되었습니다!
                        </ModalTitle>
                        <ModalSubText>
                            포스트잇은 최대 10개까지만 추가할 수 있습니다.
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
                                ? <>채택이 해제된 댓글은<br/> 댓글창에서 그대로 확인할 수 있어요.</>
                                : <>채택한 댓글은 포스트잇으로 만들어져요.<br/> 포스트잇을 자유롭게 움직여보세요!</>
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

export default Postit;
