//리액트 패키지를 참조하고 Fragment 객체를 추가한다.
//Fragment객체는 최상위 HTML 태그 여러개를 하나로 묶어주는 역할 제공
import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

//사용하려면 참조를 해야함
import MyComponent1 from './MyFirstFunctionComponent';
import MyComponent2 from './MyfirstClassComponent';

//함수형 컴포넌트는 function 컴포넌트명(){ return (화면을 표시하는 JSX(X-HTML코드 제공);}
function App() {
  //전역변수 선언
  const userName = '조설아';

  //객채>> {}
  //스타일 객체 정의하기, 카멜식으로 표기하고 -는 사용안함
  const myStyle = {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: '48px',
    fontWeight: 'bold',
    padding: 16,
  };

  return (
    <Fragment>
      <div className="App">
        <MyComponent1></MyComponent1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p
            style={{
              backgroundColor: 'red',
              fontWeight: '900',
              padding: '5px 20px',
            }}
          >
            리액트 학습 Day1_2021-07-08
          </p>
          <MyComponent2></MyComponent2>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            리액트를 배워볼까요?
          </a>
          {userName === '조설아' ? (
            <h1>조설아님 반갑습니다.</h1>
          ) : (
            <h1>넌 누구냐</h1>
          )}
        </header>
      </div>

      {/* CSS 파일에 정의된 CSS클래스 적용시 className속성을 이용한다. */}
      <div className="App">클래스 적용하기</div>

      {/* 주석입니다 내가바로 그렇습니다!!! */}
      <div style={myStyle}>{userName}님 학습 1일차입니다.</div>
    </Fragment>
  );
}

export default App;
