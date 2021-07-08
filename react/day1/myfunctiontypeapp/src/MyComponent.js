import React from "react";

//함수형 컴포넌트 입력파라미터로 props를 정의하여
//부모로부터 전달된 속성값을 받아올 수 있다.
const MyComponent = (props) => {
  return (
    <div>
      {/* 부모 컴포넌트에서 정의한 콘텐츠 내용을 제목으로 표시한다.
        props.children사용하기 */}

      <h1>{props.children}</h1>
      <table
        style={{ width: "500px", height: "300px", border: "1px solid black" }}
      >
        <tr>
          <td>이름</td>
          <td>{props.name}</td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td>{props.telephone}</td>
        </tr>
        <tr>
          <td>메일주소</td>
          <td>{props.email}</td>
        </tr>
        <tr>
          <td>나이</td>
          <td>{props.age}</td>
        </tr>
        <tr>
          <td>주소</td>
          <td>{props.address}</td>
        </tr>
        <tr>
          <td colSpan="2">
            <button>확인</button>
          </td>
        </tr>
      </table>
    </div>
  );
};

//defaltProps 정의 속성은 부모에서 해당 속성을 정의하지 않아도
//자식에서 정의하고 기본값을 세팅할 수 있다.
MyComponent.defaltProps = {
  address: "경기도 성남시..",
};

export default MyComponent;
