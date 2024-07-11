import React from "react";
import exspinner from '../../Assets/Img/exspinner.svg';

const Spinner = () => {
  return (
    <div>
      <h3>잠시만 기다려주세요.</h3>
      <img src={exspinner} alt='exspinner'>
    </div>
  );
};

export default Spinner;