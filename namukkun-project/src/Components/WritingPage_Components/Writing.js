import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../Assets/Style/quill.snow.custom.css';
import SideHint from '../../Assets/Img/SideHint.svg';
import Picture from '../../Assets/Img/Picture.svg';
import WritingModal from './WritingModal';

// Custom font
const fonts = ['Min Sans-Regular'];
const Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

const handleImageUpload = (quill, file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const range = quill.getSelection();
    if (file.type.startsWith('image/')) {
      quill.insertEmbed(range.index, 'image', e.target.result);
    }
  };
  reader.readAsDataURL(file);
};

// Custom toolbar configuration
const modules = {
  toolbar: {
    container: [
      [{ 'size': [] }],
      ['bold'],
      ['image']
    ],
    handlers: {
      image: function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = () => {
          const file = input.files[0];
          if (file) {
            handleImageUpload(this.quill, file);
          }
        };
        input.click();
      }
    }
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'font', 'size', 'bold', 'image'
];

const Writing = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [title, setTitle] = useState('');
  const [background, setBackground] = useState('');
  const [solution, setSolution] = useState('');
  const [effect, setEffect] = useState('');
  const [attachments, setAttachments] = useState([]);

  // 모달창 끌지 켤지 다루는 usestate
  const [isWModalOpen, setIsWModalOpen] = useState(false);
  // 모달 종류 확인
  const [modalMethod, setModalMethod] = useState('');

  // 모달창 관리하는 함수
  const handleWModalOpen = (modalMethod) => {
    setModalMethod(modalMethod);
    setIsWModalOpen(!isWModalOpen);
  };

  const handleButtonClick = (region) => {
    setSelectedButton(region);
  };

  const handleInputChange = (setter, limit) => (value) => {
    if (value.replace(/<\/?[^>]+(>|$)/g, "").length <= limit) {
      setter(value);
    } else {
      const limitedValue = value.replace(/<\/?[^>]+(>|$)/g, "").substring(0, limit);
      setter(limitedValue);
    }
  };

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)]);
  };

  const handleFileRemove = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
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
            onChange={(e) => handleInputChange(setTitle, 30)(e.target.value)} // 제목 글자수 제한 (30자)
          />
        </Section>
        <Section>
          <Label>
            제안배경 <HintWrapper><HintIcon src={SideHint} alt="Alert" /><Hint>장소나 기사 링크를 함께 넣어주면 다른 지역 주민들이 공감하기 쉬워요!</Hint></HintWrapper>
          </Label>
          <QuillContainer>
            <StyledQuill
              theme="snow"
              value={background}
              onChange={handleInputChange(setBackground, 250)} // 제안배경 글자수 제한 (250자)
              modules={modules}
              formats={formats}
            />
          </QuillContainer>
        </Section>
        <Section>
          <Label>
            해결방안 <HintWrapper><HintIcon src={SideHint} alt="Alert" /><Hint>사례 사진을 함께 넣어주면 다른 지역주민들이 이해하기 쉬워요!</Hint></HintWrapper>
          </Label>
          <QuillContainer>
            <StyledQuill
              theme="snow"
              value={solution}
              onChange={handleInputChange(setSolution, 250)} // 해결방안 글자수 제한 (250자)
              modules={modules}
              formats={formats}
            />
          </QuillContainer>
        </Section>
        <Section>
          <Label>기대효과</Label>
          <QuillContainer>
            <StyledQuill
              theme="snow"
              value={effect}
              onChange={handleInputChange(setEffect, 250)} // 기대효과 글자수 제한 (250자)
              modules={modules}
              formats={formats}
            />
          </QuillContainer>
        </Section>
        <Section>
          <Label>첨부파일</Label>
          <FileWrapper>
            <FileBox>
              <FileInputWrapper>
                <FileInput type="file" multiple onChange={handleFileChange} id="file-upload" />
                {attachments.map((file, index) => (
                  <FileItem key={index}>
                    <FileName>{file.name}</FileName>
                    <RemoveButton onClick={() => handleFileRemove(index)}>제거</RemoveButton>
                  </FileItem>
                ))}
              </FileInputWrapper>
            </FileBox>
            <FileInputLabel htmlFor="file-upload">추가</FileInputLabel>
          </FileWrapper>
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

const QuillContainer = styled.div`
  width: 920px;
  .ql-container {
    height: 250px; /* Box의 높이에 맞춤 */
    border-radius: 20px;
  }
`;

const StyledQuill = styled(ReactQuill)`
  .ql-container {
    height: 250px; /* Box의 높이에 맞춤 */
    border-radius: 10px;
    width: 920px;
  }
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

const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const FileBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  padding: 18px;
  border: 1px solid var(--gray-001, #E0E0E0);
  border-radius: 10px;
  background: var(--white-004, #FDFDFD);
  max-height: 150px; /* 최대 높이를 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  width: 72px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: #005AFF;
  color: #FFF;
  font-family: "MinSans-Regular";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: none;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 5px;
`;

const FileName = styled.div`
  margin-left: 10px;
  font-family: "MinSans-Regular";
  font-size: 16px;
`;

const RemoveButton = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-family: "MinSans-Regular";
  font-size: 14px;
`;

export default Writing;
