import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../Assets/Style/quill.snow.custom.css';
import SideHint from '../../Assets/Img/SideHint.svg';
import WritingModal from './WritingModal';
import { GlobalStyle } from '../../Assets/Style/theme';
import { uploadImageAPI, uploadFileFetch, submitPostAPI } from '../../API/AxiosAPI.js';

// Custom font
const fonts = ['Min Sans-Regular'];
const Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

const handleImageUpload = async (quill, file) => {
  const imageUrls = await uploadImageAPI(file);
  if (imageUrls && imageUrls.length > 0) {
    const range = quill.getSelection();
    imageUrls.forEach((url) => {
      quill.insertEmbed(range.index, 'image', url);
      range.index += 1; // Move the cursor to insert the next image after the current one
    });
    console.log('Uploaded image URLs:', imageUrls);
  } else {
    console.error('Image upload failed or no image URLs returned');
  }
};

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
        input.onchange = async () => {
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
  const [fileNames, setFileNames] = useState([]);  // 화면에 표시될 파일 이름
  const [fileRandomStrings, setFileRandomStrings] = useState([]);  // 서버에 전송될 랜덤 문자열

  const [isWModalOpen, setIsWModalOpen] = useState(false);
  const [modalMethod, setModalMethod] = useState('');

  const handleWModalOpen = (modalMethod) => {
    setModalMethod(modalMethod);
    setIsWModalOpen(!isWModalOpen);
  };

  const handleButtonClick = (region) => {
    setSelectedButton(region);
    console.log('선택된 지역:', region);
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const fileNamesArray = files.map(file => file.name);
    setFileNames([...fileNames, ...fileNamesArray]);  // 화면에 표시될 파일 이름 설정

    try {
      const uploadedFiles = await Promise.all(files.map(file => uploadFileFetch(file)));
      const validFiles = uploadedFiles.filter(file => file && file.length > 0);
      const newFileRandomStrings = validFiles.flat();
      setFileRandomStrings([...fileRandomStrings, ...newFileRandomStrings]);
      console.log('업로드된 파일 랜덤 문자열:', newFileRandomStrings);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  const handleFileRemove = (index) => {
    setFileNames(fileNames.filter((_, i) => i !== index));
    setFileRandomStrings(fileRandomStrings.filter((_, i) => i !== index));
  };

  const regionToInt = {
    '경산시': 0,
    '경주시': 1,
    '구미시': 2,
    '김천시': 3,
    '문경시': 4,
    '상주시': 5,
    '안동시': 6,
    '영주시': 7,
    '영천시': 8,
    '포항시': 9
  };

  const handleSubmit = async () => {
    if (selectedButton === null) {
      console.error('지역을 선택하지 않았습니다.');
      return;
    }

    const postData = {
      title,
      postLocal: regionToInt[selectedButton],
      proBackground: background,
      solution,
      benefit: effect,
      fileNames: fileRandomStrings,  // 서버에 보낼 때 파일 랜덤 문자열 리스트를 포함
      userId: 1,
      return: true,
    };

    console.log('전송할 데이터:', JSON.stringify(postData));

    try {
      const response = await submitPostAPI(postData);
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('서버로 값을 보내는 중 오류 발생:', error);
    }
  };

  return (
    <Container>
      <GlobalStyle />
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
            onChange={(e) => handleInputChange(setTitle)(e.target.value)}
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
              onChange={setBackground}
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
              onChange={setSolution}
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
              onChange={setEffect}
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
                {fileNames.map((name, index) => (
                  <FileItem key={index}>
                    <FileName>{name}</FileName>
                    <RemoveButton onClick={() => handleFileRemove(index)}>제거</RemoveButton>
                  </FileItem>
                ))}
              </FileInputWrapper>
            </FileBox>
            <FileInputLabel htmlFor="file-upload">추가</FileInputLabel>
          </FileWrapper>
        </Section>
        <ButtonSection>
          <PostButton onClick={handleSubmit}>게시하기</PostButton>
        </ButtonSection>
        <Section>
          <Label>파일 랜덤 문자열 상태 확인:</Label>
          <pre>{JSON.stringify(fileRandomStrings, null, 2)}</pre>
        </Section>
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
    `}
`;

const WritingBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 921px;
  margin-top: 20px;
  gap: 84px;
  margin-bottom: 200px;
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
  line-height: 20px;
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
    height: 250px;
    border-radius: 20px;
  }
`;

const StyledQuill = styled(ReactQuill)`
  .ql-container {
    height: 250px;
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
  max-height: 150px;
  overflow-y: auto;
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
