import "./App.css";

//프로파일 MyComponent 참조
import prifile from "./MyComponent";
import prifile2 from "./MyComponent2";
import say from "./Say";

function App() {
  return (
    <div>
      <prifile
        test="aaa"
        name="조설아"
        telephone="010-1234-5678"
        email="naver.com"
        age={30}
      >
        내소개1
      </prifile>
      <hr></hr>
      <prifile2
        test="aaa"
        name="조설아"
        telephone="010-1234-5678"
        email="naver.com"
        age={20}
      ></prifile2>
      <hr></hr>
      <say
        test="aaa"
        name="조설아"
        telephone="010-1234-5678"
        email="naver.com"
        age={10}
      ></say>
    </div>
  );
}

export default App;
