//컴포넌트 물리적 파일이름은 파스칼식 표기법을 따른다.

import React, { Component } from 'react';

//클래스 컴포넌트를 정의한다.
//리액트 클래스 컴포넌트의 베이스 컴포넌트인 Component 객체를 참조한다.
//리액트 팩키지 내의 COmponetn라는 클래스를 상속받아(extends) MyfirstClassComponent 클래스 멐포넌트를 정의한다.
//클래스형 컴포넌트는 반드시 Component를 상속받아 구현한다.
class MyfirstClassComponent extends Component {
  //클래스형 컴포넌트에는 반드시 render()메소드를 호출해주고 해당 메소드내에서 returnn을 통해 jsx를 반환해야한다.
  render() {
    //JSX 영역 정의
    return <div>나의 첫 클래스형 컴포넌트</div>;
  }
}

export default MyfirstClassComponent;
