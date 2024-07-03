import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../Assets/Style/quill.snow.custom.css';
import SideHint from '../../Assets/Img/SideHint.svg';

// Custom font
const fonts = ['Min Sans-Regular'];
const Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

const handleFileUpload = (quill, file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const range = quill.getSelection();
    if (file.type.startsWith('image/')) {
      quill.insertEmbed(range.index, 'image', e.target.result);
    } else {
      const fileName = file.name;
      const link = e.target.result;
      quill.insertText(range.index, fileName, 'link', link);
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
      ['link']
    ],
    handlers: {
      link: function(value) {
        if (value) {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', '.pdf,.doc,.docx,.hwp,.jpg,.png,.jpeg'); // 지원하는 파일 형식
          input.onchange = () => {
            const file = input.files[0];
            if (file) {
              handleFileUpload(this.quill, file);
            }
          };
          input.click();
        } else {
          this.quill.format('link', false);
        }
      }
    }
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'font', 'size', 'bold', 'link', 'image'
];

const MyComponent = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [title, setTitle] = useState('');
  const [background, setBackground] = useState('');
  const [solution, setSolution] = useState('');
  const [effect, setEffect] = useState('');

  const handleExit = () => {
    // 나가기 버튼 클릭 시 실행되는 함수
  };

  const handleSave = () => {
    // 임시저장 버튼 클릭 시 실행되는 함수
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

  return (
    <Container>
      <Intro>
        <TopButtonContainer>
          <BackButton onClick={handleExit}>나가기</BackButton>
          <SaveButton onClick={handleSave}>임시저장</SaveButton>
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
        <ButtonSection>
          <PostButton onClick={handleSave}>게시하기</PostButton>
        </ButtonSection>
      </WritingBody>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export default MyComponent;
