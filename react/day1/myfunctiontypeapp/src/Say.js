import React from "react";

const Say = (props) => {
  //ES5 비구조 할당 문법을 이용해
  const { name, telephone, email, age } = props;
  return (
    <div>
      <h1>프로파일1</h1>
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

export default Say;
