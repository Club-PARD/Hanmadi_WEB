import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../Assets/Style/quill.snow.custom.css';
import SideHint from '../../Assets/Img/SideHint.svg';
// import WritingModal from './WritingModal';
import { GlobalStyle } from '../../Assets/Style/theme';
import { deleteFileAPI, uploadImageAPI, uploadFileFetch, submitPostAPI, saveTempPostAPI, getUserAllInfoAPI, loginCheckAPI, getPostUpdate, updatePostPatch } from '../../API/AxiosAPI.js';
import { useNavigate, useParams } from 'react-router-dom';
import ModifyModal from './ModifyModal.js';

// Custom font
const fonts = ['Min Sans-Regular'];
const Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

// 이미지 URL을 추출하여 <img> 태그로 변환하고 문단 띄기를 추가하는 함수
const convertTextToImages = (text) => {
    const regex = /\[이미지: (https?:\/\/[^\]]+)\]/g;
    const parts = text.split(regex);
    return parts.map((part, index) =>
        part.startsWith('http') ? (
            `<img key=${index} src=${part} alt=content-${index} style="width: 100%; height: auto;" />`
        ) : (
            part.split('\n').map((line) => `${line}<br />`).join('')
        )
    ).join('');
};


const GlobalQuillStyles = createGlobalStyle`
  .ql-editor.ql-blank::before {
    color: #C7C7C7;
    font-family: "Min Sans-Regular";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;

    left: 32px;
    content: attr(data-placeholder);
    pointer-events: none; // Ensures the placeholder is not interactive
  }
`;

const Modify = () => {
  const { postId } = useParams(); // useParams를 이용해 postId 가져오기
  const quillRefBackground = useRef(null);
  const quillRefSolution = useRef(null);
  const quillRefEffect = useRef(null);

  const [selectedButton, setSelectedButton] = useState(null);
  const [title, setTitle] = useState('');
  const [background, setBackground] = useState('');
  const [solution, setSolution] = useState('');
  const [effect, setEffect] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [fileRandomStrings, setFileRandomStrings] = useState([]);
  const [backgroundImageNames, setBackgroundImageNames] = useState([]);
  const [solutionImageNames, setSolutionImageNames] = useState([]);
  const [effectImageNames, setEffectImageNames] = useState([]);
  const [imageUrlMap, setImageUrlMap] = useState({}); // 이미지 URL과 파일 이름을 매핑하는 상태

  const [isWModalOpen, setIsWModalOpen] = useState(false);
  const [modalMethod, setModalMethod] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // 수정 모달 상태 추가
  const navigate = useNavigate();

  // 파일 이름을 자르고 형식을 붙여주는 함수
  const truncateFileName = (fileName, maxLength) => {
    const fileExtension = fileName.slice(fileName.lastIndexOf('.'));
    console.log("1", fileExtension);
    const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
    console.log("2", nameWithoutExtension);
    const nameParts = nameWithoutExtension.split('_');
    console.log("3", nameParts);
    let truncatedName = nameParts.length > 1 ? nameParts[1] : nameParts[0]; // 첫 번째 언더바 다음의 이름만 사용
    
    // 디코딩
    truncatedName = decodeURIComponent(truncatedName);
    console.log("4", truncatedName);

    if (truncatedName.length > maxLength) {
        return truncatedName.slice(0, maxLength) + '…' + fileExtension;
    }
    return truncatedName + fileExtension;
  };

  const checkloginFunc = async () => {
    try {
      const response = await loginCheckAPI();
      if (response.status === 200) {
        return;
      } else {
        navigate('/main');
      }
    } catch (error) {
      console.error("로그인 체크 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    checkloginFunc();
  }, []);

  // 게시하기/임시저장을 위한 유저 아이디
  const [userid, setUserid] = useState(null);
  // 유저 아이디
  const getUserID = async () => {
    const response = await getUserAllInfoAPI();
    setUserid(response.userId);
  }

  useEffect(() => {
    getUserID();
  }, [])

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

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const post = await getPostUpdate(postId); // postId로 게시물 내용 가져오기
        setTitle(post.title);
        setBackground(convertTextToImages(post.proBackground)); // 이미지와 문단 띄기 처리
        setSolution(convertTextToImages(post.solution)); // 이미지와 문단 띄기 처리
        setEffect(convertTextToImages(post.benefit)); // 이미지와 문단 띄기 처리
        setSelectedButton(Object.keys(regionToInt).find(key => regionToInt[key] === post.postLocal));
        
        // 첨부 파일 설정
        setFileNames(post.s3Attachments.map(file => file.name));
        setFileRandomStrings(post.s3Attachments.map(file => file.randomString));

      } catch (error) {
        console.error('게시물 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const fileNamesArray = files.map(file => file.name);
    setFileNames([...fileNames, ...fileNamesArray]);

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

  const handleFileRemove = async (index) => {
    try {
      const fileNameToRemove = fileRandomStrings[index];
      console.log('Removing file with name:', fileNameToRemove);

      await deleteFileAPI(fileNameToRemove);

      const updatedFileNames = [...fileNames];
      const updatedFileRandomStrings = [...fileRandomStrings];

      updatedFileNames.splice(index, 1);
      updatedFileRandomStrings.splice(index, 1);

      setFileNames(updatedFileNames);
      setFileRandomStrings(updatedFileRandomStrings);

      console.log('파일이 성공적으로 제거되었습니다:', fileNameToRemove);
    } catch (error) {
      console.error('파일 제거 중 오류 발생:', error);
    }
  };

  const handleImageUpload = useCallback(async (quill, file, setImageNames) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const localUrl = e.target.result;
      const range = quill.getSelection();

      quill.insertText(range.index, '\n'); // 줄바꿈 추가
      quill.insertEmbed(range.index + 1, 'image', localUrl); // 이미지 삽입
      quill.insertText(range.index + 2, '\n'); // 이미지 뒤에 줄바꿈 추가
      quill.setSelection(range.index + 3); // 커서를 이미지 뒤로 이동

      try {
        await uploadImageAPI(file);

        setImageNames((prev) => [...prev, file.name]);
        setImageUrlMap(prev => ({ ...prev, [localUrl]: file.name })); // 로컬 URL과 파일 이름을 매핑
        console.log('Uploaded image file name:', file.name);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    };

    reader.readAsDataURL(file);
  }, []);

  const handleTextChange = (setter, imageSetter, editorRef) => (content, delta, source, editor) => {
    if (editor.getLength() <= 5001) {
      setter(content);
      if (source === 'user') {
        const currentContents = editor.getContents();
        const newImageNames = [];
        currentContents.ops.forEach(op => {
          if (op.insert && op.insert.image) {
            const src = op.insert.image;
            const imageName = imageUrlMap[src]; // 이미지 URL을 파일 이름으로 매핑
            if (imageName) {
              newImageNames.push(imageName);
              console.log("배열", newImageNames);
            }
          }
        });
        imageSetter(newImageNames);
      }
    }
    adjustEditorHeight(editorRef);
  };

  const adjustEditorHeight = (editorRef) => {
    const editor = editorRef.current.getEditor();
    const editorContainer = editor.root;
    editorContainer.style.height = '250px'; // 기본 높이 설정
    if (editorContainer.scrollHeight > 250) {
      editorContainer.style.height = editorContainer.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustEditorHeight(quillRefBackground);
  }, [background]);

  useEffect(() => {
    adjustEditorHeight(quillRefSolution);
  }, [solution]);

  useEffect(() => {
    adjustEditorHeight(quillRefEffect);
  }, [effect]);

  const backgroundModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'size': [] }],
        ['bold'],
        ['image']
      ],
      handlers: {
        image: function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              handleImageUpload(this.quill, file, setBackgroundImageNames);
            }
          };
          input.click();
        }
      }
    },
    clipboard: {
      matchVisual: false,
    },
  }), [handleImageUpload]);

  const solutionModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'size': [] }],
        ['bold'],
        ['image']
      ],
      handlers: {
        image: function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              handleImageUpload(this.quill, file, setSolutionImageNames);
            }
          };
          input.click();
        }
      }
    },
    clipboard: {
      matchVisual: false,
    },
  }), [handleImageUpload]);

  const effectModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'size': [] }],
        ['bold'],
        ['image']
      ],
      handlers: {
        image: function () {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              handleImageUpload(this.quill, file, setEffectImageNames);
            }
          };
          input.click();
        }
      }
    },
    clipboard: {
      matchVisual: false,
    },
  }), [handleImageUpload]);

  const formats = [
    'font', 'size', 'bold', 'image'
  ];

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

  const isSubmitDisabled = !selectedButton || !title || !background || !solution || !effect;

  //게시하기
  const handleSubmit = async () => {
    if (isSubmitDisabled) {
      return;
    }

    await getUserID();

    const replaceImageSrc = (html, imageNames) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      const images = div.getElementsByTagName('img');
      Array.from(images).forEach((img, index) => {
        const fileName = imageNames[index];
        img.setAttribute('src', fileName);
      });
      return div.innerHTML;
    };

    const postData = {
      title,
      postLocal: regionToInt[selectedButton],
      proBackground: replaceImageSrc(background, truncateFileName(backgroundImageNames)),
      solution: replaceImageSrc(solution, (solutionImageNames)),
      benefit: replaceImageSrc(effect, (effectImageNames)),
      fileNames: convertTextToImages(fileRandomStrings),
      userId: userid,
      // return: true,
    };

    console.log('전송할 데이터:', JSON.stringify(postData));

    try {
      const response = await updatePostPatch(postId, postData);
      console.log('서버 응답:', response.data);

      navigate(`/postit/${postId}`);
    } catch (error) {
      console.error('서버로 값을 보내는 중 오류 발생:', error);
    }
  };

  // 임시저장
  const handleSave = async () => {
    const replaceImageSrc = (html, imageNames) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      const images = div.getElementsByTagName('img');
      Array.from(images).forEach((img, index) => {
        const fileName = imageNames[index];
        img.setAttribute('src', fileName);
      });
      return div.innerHTML;
    };

    await getUserID();

    const postData = {
      title,
      postLocal: regionToInt[selectedButton],
      proBackground: replaceImageSrc(background, backgroundImageNames),
      solution: replaceImageSrc(solution, solutionImageNames),
      benefit: replaceImageSrc(effect, effectImageNames),
      fileNames: convertTextToImages(fileRandomStrings),
      userId: userid,
      return: false, // 임시저장의 경우 false로 설정
    };

    console.log('임시 저장 데이터:', JSON.stringify(postData));

    try {
      const response = await saveTempPostAPI(postData);
      console.log('서버 응답:', response.data);
      navigate('/mypage');
    } catch (error) {
      console.error('임시 저장 중 오류 발생:', error);
    }
  };

  return (
    <Container>
      <GlobalQuillStyles />
      <GlobalStyle />
      <Intro>
        <TopButtonContainer>
          <BackButton onClick={() => handleWModalOpen('out')}>나가기</BackButton>
          <SaveButton onClick={() => handleWModalOpen('temp')}>임시저장</SaveButton>
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
          <InputBox
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
              ref={quillRefBackground}
              theme="snow"
              value={background}
              onChange={handleTextChange(setBackground, setBackgroundImageNames, quillRefBackground)}
              modules={backgroundModules}
              formats={formats}
              placeholder="이런 생각이 들어서 제안하러 왔어요"
            />
          </QuillContainer>
        </Section>
        <Section>
          <Label>
            해결방안 <HintWrapper><HintIcon src={SideHint} alt="Alert" /><Hint>사례 사진을 함께 넣어주면 다른 지역주민들이 이해하기 쉬워요!</Hint></HintWrapper>
          </Label>
          <QuillContainer>
            <StyledQuill
              ref={quillRefSolution}
              theme="snow"
              value={solution}
              onChange={handleTextChange(setSolution, setSolutionImageNames, quillRefSolution)}
              modules={solutionModules}
              formats={formats}
              placeholder="이렇게 해보면 좋을거 같아요"
            />
          </QuillContainer>
        </Section>
        <Section>
          <Label>기대효과</Label>
          <QuillContainer>
            <StyledQuill
              ref={quillRefEffect}
              theme="snow"
              value={effect}
              onChange={handleTextChange(setEffect, setEffectImageNames, quillRefEffect)}
              modules={effectModules}
              formats={formats}
              placeholder="그러면 우리 지역이 이렇게 되지 않을까요?"
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
          <PostButton onClick={handleSubmit} disabled={isSubmitDisabled}>
            게시하기
          </PostButton>
        </ButtonSection>
        <HiddenSection>
          <Label>파일 랜덤 문자열 상태 확인:</Label>
          <pre>{JSON.stringify(fileRandomStrings, null, 2)}</pre>
        </HiddenSection>
        <HiddenSection>
          <Label>이미지 파일 이름 상태 확인:</Label>
          <pre>{JSON.stringify(backgroundImageNames, null, 2)}</pre>
          <pre>{JSON.stringify(solutionImageNames, null, 2)}</pre>
          <pre>{JSON.stringify(effectImageNames, null, 2)}</pre>
        </HiddenSection>
      </WritingBody>
      <ModifyModal
        isOpen={isWModalOpen}
        closeModal={() => handleWModalOpen(modalMethod)}
        method={modalMethod}
        handleSave={handleSave}
      ></ModifyModal>
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
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap;

  border-radius: 6.623px;
  border: 1px solid var(--Main-001, #005AFF);
  background: rgba(0, 90, 255, 0.06);
  cursor: pointer;
`;

const SaveButton = styled.button`
  display: flex;
  width: 78px;
  height: 36px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: var(--white-001, #FFF);
  text-align: center;
  font-family: "MinSans-Regular";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap;

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
  font-size: 18px;
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

const HiddenSection = styled(Section)`
  display: none;
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

const sharedStyles = css`
  display: inline-flex;
  width: 880px;
  padding: 20px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--gray-001, #E0E0E0);
  background: var(--white-004, #FDFDFD);
  color: #393939;
  font-size: 22px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: #B0B0B0;
  }

  &:focus-within {
    border-color: var(--Main-001, #005AFF);
    box-shadow: 0 0 0 3px rgba(0, 90, 255, 0.2);
  }
`;

const InputBox = styled.input`
  ${sharedStyles}
  height: 15px;
  &::placeholder {
    color: #C7C7C7;
    font-size: 22px;
  }
`;

const QuillContainer = styled.div`
  width: 920px;
  .ql-container {
    ${sharedStyles}
    min-height: 250px; /* 기본 높이 설정 */
    max-height: 600px; /* 최대 높이 설정 */
    overflow-y: auto; /* 내용이 많을 경우 스크롤바 표시 */
  }
`;

const StyledQuill = styled(ReactQuill)`
  .ql-container {
    border-radius: 10px;
    width: 100%;
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
  width: 120px;
  height: 50px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  background: ${({ disabled }) => (disabled ? '#ECECEC' : '#005AFF')};
  color: ${({ disabled }) => (disabled ? '#A0A0A0' : '#FFF')};
  font-family: "MinSans-Regular";
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: none;
  margin-top: 20px;
  align-self: flex-end;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#ECECEC' : '#004EDC')};
  }
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
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: #005AFF;
  color: #FFF;
  font-family: "MinSans-Regular";
  font-size: 20px;
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

export default Modify;
