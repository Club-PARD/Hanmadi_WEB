import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { getUserAllInfoAPI, movePostit } from '../../API/AxiosAPI';
import {
    BlueContainer, YellowContainer, BrownContainer,
    AllPostitContainer, PostitWriteButtonContainer, PostitContent,
    PostitInfo, PostWriting, ButtonContainer, MoveButton,
    ScrollButton, DeleteButtonContainer, DeleteButton
} from './styledComponents';
import nextbutton from '../../Assets/Img/nextbutton.svg';
import close from '../../Assets/Img/close.svg';
import { useParams } from "react-router-dom";

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

const DraggablePostit = ({ postit, onMove, onDelete, onStart, onScrollToComment, bringToFront }) => {
    const { postId } = useParams();  // useParams 훅을 사용하여 postId를 가져옴
    const [position, setPosition] = useState({ x: postit.x, y: postit.y });

    //내 포스트만 수정 삭제
    const [myPostCheck, setMyPostCheck] =useState(false); 
    const [postIds, setPostIds] = useState([]);

    //유저 아이디
    // const [userId, serUserId] =useState(null);

    const getPostandCommentsIds = async () => {
        try {
            const response = await getUserAllInfoAPI();
            //내가 작성한 포스트 아이디를 불러옴
            const ids = response.posts.map(post => post.postId);
            console.log(ids);
            setPostIds(ids);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPostandCommentsIds();
    }, []);

    useEffect(() => {
        if (postIds.length > 0) {
            //내 포스트인지 확인
            const exists = postIds.includes(parseInt(postId));
            setMyPostCheck(exists);
            console.log("my", exists);
        }
    }, [postIds, postId]);


    //스크롤 함수
    const handleStop = async (e, data) => {
            const newPosition = { x: data.x, y: data.y };
            setPosition(newPosition);
            postit.position = newPosition;
            postit.x = newPosition.x;
            postit.y = newPosition.y;

            try {
                await movePostit({
                    postItId: postit.postItId,
                    postId: postId,  // postId를 동적으로 사용
                    commentId: postit.commentId,
                    userId: postit.userId,
                    x: newPosition.x,
                    y: newPosition.y,
                    z: postit.z
                });
            } catch (error) {
                console.error('Error moving postit:', error);
            }
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
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

    const postitContent = (
        <PostitStyledContainer id={postit.postItId} style={{ zIndex: postit.z }}>
            <AllPostitContainer>
                <PostitWriteButtonContainer>
                    <PostitContent>
                        <PostitInfo>
                            {postit.nickname || '알 수 없음'} / {intToRegion[postit.local] || '선택 없음'} {/* 닉네임 또는 지역 정보가 없는 경우 '알 수 없음'과 '선택 없음'을 표시 */}
                        </PostitInfo>
                        <PostWriting>{truncateText(postit.content, 90)}</PostWriting>
                    </PostitContent>
                    <ButtonContainer>
                        {myPostCheck &&
                            <MoveButton onClick={(e) => {
                                e.stopPropagation(); // 이벤트 버블링 방지
                                onMove();
                            }}>
                                <img src={nextbutton} alt='nextbutton' style={{ width: '72px' }} />
                            </MoveButton>
                        }
                        <ScrollButton onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            onScrollToComment();
                        }}>댓글 보러가기</ScrollButton>
                    </ButtonContainer>
                </PostitWriteButtonContainer>
                {myPostCheck &&
                    <DeleteButtonContainer>
                        <DeleteButton onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            onDelete();
                        }}>
                            <img src={close} alt='close' style={{ width: '10px', height: '10px' }} />
                        </DeleteButton>
                    </DeleteButtonContainer>
                }
            </AllPostitContainer>
        </PostitStyledContainer>
    );

    return myPostCheck ? (
        <Draggable
            bounds="parent"
            position={position}
            onStart={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                bringToFront(postit.postItId);
                onStart();
            }}
            onStop={handleStop}
        >
            {postitContent}
        </Draggable>
    ) : (
        <Draggable
        bounds="parent"
            position={position}
            onStart={(e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            bringToFront(postit.postItId);
            onStart();
        }}>
            {postitContent}
        </Draggable>
    );
};


export default DraggablePostit;
