// TextFadeinAnimation.js
//하위 컴포넌트로 감싼 텍스트에 애니메이션을 주는 함수

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TextAnimation = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, props.fadeinTime * 1000);

        return () => clearTimeout(timeout); // 컴포넌트가 unmount될 때 clearTimeout
    }, [props.fadeinTime]);

    return (
        <Container className={isVisible ? 'visible' : ''} fadeinTime={props.fadeinTime}>
            {props.children}
        </Container>
    );
};

const Container = styled.div`
    opacity: 0;
    transform: translateY(30px); //초기 위치 Y 30 아래
    transition: opacity ${(props) => props.fadeinTime}s, transform ${(props) => props.fadeinTime}s;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

export default TextAnimation;