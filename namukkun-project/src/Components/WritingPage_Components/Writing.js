import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import SideHint from '../../Assets/Img/SideHint.svg';
import Picture from '../../Assets/Img/Picture.svg';
import WritingModal from './WritingModal';

const Writing = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [title, setTitle] = useState('');
  const [background, setBackground] = useState('');
  const [solution, setSolution] = useState('');
  const [effect, setEffect] = useState('');

  const backgroundRef = useRef(null);
  const solutionRef = useRef(null);
  const effectRef = useRef(null);

  //모달창 끌지 켤지 다루는 usestate
  const [isWModalOpen, setIsWModalOpen] = useState(false);
  //모달 종류 확인
  const [modalMethod, setModalMethod] = useState('');

  //모달창 관리하는 함수
  const handleWModalOpen = () => {
    setModalMethod(modalMethod);
    setIsWModalOpen(!isWModalOpen);
  };

  const handleButtonClick = (region) => {
    setSelectedButton(region);
  };

  const handleInputChange = (setter, limit) => (e) => {
    if (e.target.value.length <= limit) {
      setter(e.target.value);
    }
  };

  const handleImageChange = (ref) => (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.style.maxWidth = '100px';
        img.style.maxHeight = '100px';
        ref.current.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Intro>
        <TopButtonContainer>
          <BackButton onClick={() => handleWModalOpen('out')}>나가기</BackButton>
          <SaveButton onClick={() => handleWModalOpen('save')}>임시저장</SaveButton>
        </TopButtonContainer>
        <RegionContainer>
          <SelectRegion>제안지역 선택하기</SelectRegion>
          <RegionButtonContainer>
            {['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '영천시', '포항시'].map((region) => (
              <LocalButton
                key={region}
                onClick={() => handleButtonClick(region)}
                selected={selectedButton === region}
              >
                {region}
              </LocalButton>
            ))}
          </RegionButtonContainer>
        </RegionContainer>
      </Intro>
      <WritingBody>
        <Section>
          <Label>제목</Label>
          <TitleBox
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleInputChange(setTitle, 30)} // 제목 글자수 제한 (30자)
          />
        </Section>
        <Section>
          <Label>
            제안배경 <HintWrapper><HintIcon src={SideHint} alt="Alert" /><Hint>장소나 기사 링크를 함께 넣어주면 다른 지역 주민들이 공감하기 쉬워요!</Hint></HintWrapper>
          </Label>
          <EditableBox
            contentEditable
            ref={backgroundRef}
            placeholder="이런 생각이 들어서 제안하게 되었어요."
          />
          <PictureLabel htmlFor="background-upload">
            <PictureIcon src={Picture} alt="Upload" />
          </PictureLabel>
          <input type="file" id="background-upload" style={{ display: 'none' }} onChange={handleImageChange(backgroundRef)} />
          <Count>{background.length}/400</Count>
        </Section>
        <Section>
          <Label>
            해결방안 <HintWrapper><HintIcon src={SideHint} alt="Alert" /><Hint>사례 사진을 함께 넣어주면 다른 지역주민들이 이해하기 쉬워요!</Hint></HintWrapper>
          </Label>
          <EditableBox
            contentEditable
            ref={solutionRef}
            placeholder="이렇게 해보면 좋을 것 같아요."
          />
          <PictureLabel htmlFor="solution-upload">
            <PictureIcon src={Picture} alt="Upload" />
          </PictureLabel>
          <input type="file" id="solution-upload" style={{ display: 'none' }} onChange={handleImageChange(solutionRef)} />
          <Count>{solution.length}/400</Count>
        </Section>
        <Section>
          <Label>기대효과</Label>
          <EditableBox
            contentEditable
            ref={effectRef}
            placeholder="그러면 우리 지역이 이렇게 되지 않을까요?"
          />
          <PictureLabel htmlFor="effect-upload">
            <PictureIcon src={Picture} alt="Upload" />
          </PictureLabel>
          <input type="file" id="effect-upload" style={{ display: 'none' }} onChange={handleImageChange(effectRef)} />
          <Count>{effect.length}/300</Count>
        </Section>
        <ButtonSection>
          <PostButton>게시하기</PostButton>
        </ButtonSection>
      </WritingBody>
      <WritingModal
          isOpen={isWModalOpen}
          closeModal={() => handleWModalOpen(modalMethod)}
          method={modalMethod}
      ></WritingModal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 107px;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 161px;
`;

const TopButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-end;
  margin-bottom: 17px;
`;

const BackButton = styled.button`
  display: flex;
  width: 60px;
  height: 36px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  gap: 10px;

  color: var(--Main-001, #005AFF);
  text-align: center;
  font-family: "MinSans-Regular";
  font-size: 13.558px;
  font-style: normal;
  font-weight: 500;
  line-height: 29.054px; /* 214.286% */

  border-radius: 6.623px;
  border: 1px solid var(--Main-001, #005AFF);
  background: rgba(0, 90, 255, 0.06);
  cursor: pointer;
`;

const SaveButton = styled.button`
  display: flex;
  width: 70px;
  height: 36px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: var(--white-001, #FFF);
  text-align: center;
  font-family: "MinSans-Regular";
  font-size: 13.558px;
  font-style: normal;
  font-weight: 500;
  line-height: 29.054px; /* 214.286% */

  border-radius: 6.623px;
  background: var(--Main-001, #005AFF);
  border: none;
  cursor: pointer;
`;

const RegionContainer = styled.div`
  margin-top: 20px;
`;

const SelectRegion = styled.div`
  margin-bottom: 26px;

  width: 212px;
  font-family: "MinSans-Regular";
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
`;

const RegionButtonContainer = styled.div`
  display: flex;
  width: 920px;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 12px 6px;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const LocalButton = styled.button`
  display: flex;
  width: 176px;
  height: 64px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;

  color: ${({ selected }) => (selected ? '#005AFF' : '#707070')};
  font-family: "MinSans-Regular";
  font-size: 16px;
  font-weight: 500;
  line-height: 30px; /* 214.286% */

  background: ${({ selected }) => (selected ? 'rgba(0, 90, 255, 0.06)' : '#FFF')};
  border: ${({ selected }) => (selected ? '1px solid #005AFF' : '1px solid var(--gray-002, #C7C7C7)')};
  border-radius: 6.623px;
  cursor: pointer;

  ${(props) =>
    !props.selected &&
    `
    &:hover {
      background: rgba(236, 236, 236, 0.60);
      border: 1px solid #D6D6D6;
    }
  `}
`;

const WritingBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 921px;
  margin-top: 20px;
  gap: 84px;
  margin-bottom: 200px; /* 추가된 코드 */
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

const ButtonSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  color: var(--gray-006, #575757);
  font-family: "Min Sans";
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 76.923% */
  margin-bottom: 9px;
`;

const Hint = styled.span`
  color: #004EDC;
  font-family: "MinSans-Regular";
  font-size: 16px;
  margin-left: 8px;
`;

const TitleBox = styled.input`
  display: inline-flex;
  width: 880px;
  height: 15px;
  padding: 20px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--gray-001, #E0E0E0);
  background: var(--white-004, #FDFDFD);
  color: #393939;
  font-size: 22px;
  &::placeholder {
    color: #C7C7C7;
    font-size: 22px;
  }
`;

const EditableBox = styled.div`
  display: inline-flex;
  width: 880px;
  height: 250px;
  padding: 20px;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--gray-001, #E0E0E0);
  background: var(--white-004, #FDFDFD);
  resize: none;
  color: #393939;
  font-size: 22px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  &::placeholder {
    color: #C7C7C7;
    font-size: 22px;
  }
`;

const SolutionBox = styled(EditableBox)`
  height: 250px;
`;

const SideEffectBox = styled(EditableBox)`
  height: 150px;
`;

const Count = styled.div`
  align-self: flex-end;
  color: var(--gray-004, #a0a0a0);
  font-family: "MinSans-Regular";
  font-size: 18px;
  margin-top: 8px;
`;

const HintIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const HintWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 13px;
`;

const PictureLabel = styled.label`
  position: absolute;
  top: 9px; /* Box와의 거리 설정 */
  right: 9px; /* Box와의 거리 설정 */
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const PictureIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  margin-right: 10px;
`;

const PostButton = styled.button`
  display: flex;
  width: 100px;
  height: 36px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  background: #005AFF;
  color: #FFF;
  font-family: "MinSans-Regular";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: none;
  margin-top: 20px;
  align-self: flex-end;
`;

export default Writing;
