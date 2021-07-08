import React from "react";

//prop-types 참조하여 props 속성들의 데이터 형식 체크하기
import PropTypes from "prop-types";

const MyComponent2 = ({ name, telephone, email, age }) => {
  return (
    <div>
      <h1>프로파일2</h1>
      <table
        style={{ width: "500px", height: "300px", border: "1px solid black" }}
      >
        <tr>
          <td>이름</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td>{telephone}</td>
        </tr>
        <tr>
          <td>메일주소</td>
          <td>{email}</td>
        </tr>
        <tr>
          <td>나이</td>
          <td>{age}</td>
        </tr>
      </table>
    </div>
  );
};

//전달되는 props 속성중 age 속성값을 반드시 숫자로 지정
MyComponent2.propTypes = {
  //반드시 숫자로
  age: PropTypes.number,
  //반드시 반드시 전달되어야함
  telephone: PropTypes.isRequired,
};

export default MyComponent2;
