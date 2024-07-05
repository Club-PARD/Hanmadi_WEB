import React, { useState } from "react";
import styled from "styled-components";
import Contents from "./Contents";
import arrowleft from '../../Assets/Img/Arrowleft.svg';
import arrowright from '../../Assets/Img/Arrowright.svg';

function ShowList() {
  // 필터 버튼 값 설정 [추천/최신]
  const [filter, setFilter] = useState('recent');
  const onClickFilterBtn = (filterValue) => {
    setFilter(filterValue);
  }

 // 버튼 클릭 상태 관리 (버튼 수를 초기값 false로 설정) - 13은 임시 버튼 수
  const [sendBraveClicked, setSendBraveClicked] = useState(Array(13).fill(false));

  // 버튼 클릭 이벤트 핸들러
  const handleSendBraveClick = (index) => {
    const newSendBraveClicked = [...sendBraveClicked];
    newSendBraveClicked[index] = !newSendBraveClicked[index];
    setSendBraveClicked(newSendBraveClicked);
  };

  // 컨텐츠 데이터 배열 - 임시 데이터
  const contents = [
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" },
    { title: "포항시 버스정류장에 공유 우산서비스를 제안합니다 왜냐하면 버려지는 우산이 많아요. 그렇게 생각하...", like: 0, comment: 0, name: "김**님", date: "2024.07.02" }
  ];

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; //한 페이지당 보여지는 컨텐츠 갯수
  //총 페이지 갯수
  const totalPages = Math.ceil(contents.length / itemsPerPage);

   // 페이지 변경 핸들러
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

   // 현재 페이지에 해당하는 콘텐츠 배열
  const paginatedContents = contents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Div>
      <TopHeader>
        <Title>✏️{filter === 'recommend' ? '추천' : '전체'}글 모아보기</Title>
        <BtnDiv>
          <FilterBtn onClick={() => onClickFilterBtn('recommend')} isSelected={filter === 'recommend'}>추천</FilterBtn>
          <FilterBtn onClick={() => onClickFilterBtn('recent')} isSelected={filter === 'recent'}>최신</FilterBtn>
        </BtnDiv>
      </TopHeader>
      <PostListContentsDiv>
        {paginatedContents.map((content, index) => (
          <Contents
            key={index}
            content={content}
            isClicked={sendBraveClicked[(currentPage - 1) * itemsPerPage + index]}
            onClick={() => handleSendBraveClick((currentPage - 1) * itemsPerPage + index)}
          />
        ))}
      </PostListContentsDiv>
      <Pagination>
        <PaginationButton onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>
          <img src={arrowleft}></img>
        </PaginationButton>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationButton key={i} onClick={() => handleChangePage(i + 1)} isSelected={currentPage === i + 1}>
            {i + 1}
          </PaginationButton>
        ))}
        <PaginationButton onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
          <img src={arrowright}></img>
        </PaginationButton>
      </Pagination>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 96px;
  width: 935px;
  margin-bottom: 66px;
`;

const Title = styled.div`
  color: var(--gray-008, #191919);
  font-family: 'MinSans-Regular';
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 93.75% */
`;

const BtnDiv = styled.div`
  display: flex;
`;

const FilterBtn = styled.button`
  display: flex;
  height: 36px;
  padding: 9.685px;
  justify-content: center;
  align-items: center;
  gap: 9.685px;
  border-radius: 6.623px;

  color: var(--Main-001, #005AFF);
  text-align: center;
  font-family: "Min Sans";
  font-size: 13.558px;
  font-style: normal;
  font-weight: 500;
  line-height: 29.054px; /* 214.286% */
  border: none;
  background-color:  ${(props) => (props.isSelected ? '#DBE8FF' : 'transparent')}; 
  cursor: pointer;
`;

const PostListContentsDiv = styled.div`
  width: 935px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 69px;
  margin-bottom: 63px;
  gap: 10px;
`;

const PaginationButton = styled.button`
  display: flex;
  width: 31px;
  height: 31px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;

  border-radius: var(--Corner-Full, 1000px);
  background-color: ${(props) => (props.isSelected ? '#F5F5F5' : 'transparent')};
  cursor: pointer
  `

export default ShowList;
