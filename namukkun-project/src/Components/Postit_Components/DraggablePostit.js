import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { movePostit } from '../../API/AxiosAPI';
import {
    BlueContainer, YellowContainer, BrownContainer,
    AllPostitContainer, PostitWriteButtonContainer, PostitContent,
    PostitInfo, PostWriting, ButtonContainer, MoveButton,
    ScrollButton, DeleteButtonContainer, DeleteButton
} from './styledComponents';
import nextbutton from '../../Assets/Img/nexbutton.svg';
import close from '../../Assets/Img/close.svg';

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
    const [position, setPosition] = useState({ x: postit.x, y: postit.y });

    const handleStop = async (e, data) => {
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        postit.position = newPosition;
        postit.x = newPosition.x;
        postit.y = newPosition.y;

        console.log('Moving postit:', {
            postItId: postit.postItId,
            postId: 1,
            commentId: postit.commentId,
            userId: postit.userId,
            x: newPosition.x,
            y: newPosition.y,
            z: postit.z
        });

        try {
            await movePostit(postit.userId, {
                postItId: postit.postItId,
                postId: 1,
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
            onStart={() => {
                bringToFront(postit.postItId);
                onStart();
            }}
            onStop={handleStop}
        >
            <PostitStyledContainer id={postit.postItId} style={{ zIndex: postit.z }}>
                <AllPostitContainer>
                    <PostitWriteButtonContainer>
                        <PostitContent>
                            <PostitInfo>{postit.nickname} / {intToRegion[postit.local]}</PostitInfo>
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

export default DraggablePostit;
