// * 터미널에서 eslint 띄우기 싫을때 아래 코드 사용
/* eslint-disable */
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '이태원 카레 맛집']);
    let [따봉, 따봉변경] = useState([0, 2, 4]);
    let posts = '강남 고기 맛집';

    let [modal, modal변경] = useState(false);

    function 제목바꾸기() {
        var newArray = [...글제목];
        newArray[0] = '여자 코트 추천';
        글제목변경(newArray);
    }

    function 제목정렬() {
        var newArray = [...글제목];
        newArray.sort();
        글제목변경(newArray);
    }

    function 모달스위치() {
        // * 내 답압
        // modal === false ? modal변경(true) : modal변경(false);
        // * 코딩 애플 답안
        modal변경(!modal);
    }

    function 따봉바꾸기(idx) {
      console.log(idx);
    }

    return (
        <div className="App">
            <div className="black-nav">
                <div>개발 Blog</div>
            </div>
            {/* <button onClick={ 제목바꾸기 }>제목바꾸기</button>
            <button onClick={ 제목정렬 }>제목정렬</button> */}
            {글제목.map(function (글, idx) {
                console.log(idx);
                return (
                    <div className="list">
                        <h3>{글} <span> 👍 </span>{따봉[idx]}</h3>
                        <p>2월 19일 발행</p>
                        <hr />
                    </div>
                );
            })}
            <button onClick={모달스위치}>열고닫기</button>
            {modal === true ? <Modal></Modal> : null}
        </div>
    );
}

function Modal() {
    return (
        <div className="modal">
            <h2>제목</h2>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}

export default App;
