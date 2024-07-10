import React from 'react';
import { Modal, ModalContent, ModalTitle, ModalSubText, ModalButtonContainer, ModalButton } from './styledComponents';

const CustomModal = ({ title, subText, onCancel, onConfirm }) => (
    <Modal>
        <ModalContent>
            <ModalTitle>{title}</ModalTitle>
            <ModalSubText>{subText}</ModalSubText>
            <ModalButtonContainer>
                <ModalButton className="cancel" onClick={onCancel}>&nbsp;취소하기&nbsp;</ModalButton>
                <ModalButton className="confirm" onClick={onConfirm}>&nbsp;확인&nbsp;</ModalButton>
            </ModalButtonContainer>
        </ModalContent>
    </Modal>
);

export default CustomModal;
