// * 터미널에서 eslint 띄우기 싫을때 아래 코드 사용
// /* eslint-disable */
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '이태원 카레 맛집']);
    let [따봉, 따봉변경] = useState([0, 2, 4]);
    let posts = '강남 고기 맛집';

    let [modal, modal변경] = useState(false);
    let [누른제목, 누른제목변경] = useState(0);
    let [입력값, 입력값변경] = useState('');

    function 제목바꾸기() {
        // 원래 있던 글제목 배열을 복사해서 변수 newArray에 담는다.
        var newArray = [...글제목];
        // newArray 배열에서 변경을 원하는 부분을 바꾼다.
        newArray[0] = '여자 코트 추천';
        // 글제목 배열의 setState인 글제목변경에 newArray를 넣어 글제목을 바꿔준다.
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

    function 글제목추가() {
        var newArray = [...글제목];
        newArray.unshift(입력값);
        var newArray2 = [...따봉];
        newArray2.unshift(0);
        글제목변경(newArray);
        따봉변경(newArray2);
        입력값변경('');
    }

    function 따봉플러스(idx) {
        var 새로운따봉값 = 따봉[idx] + 1;
        var newArray = [...따봉];
        newArray[idx] = 새로운따봉값;
        따봉변경(newArray);
    }


    return (
        <div className="App">
            <div className="black-nav">
                <div>개발 Blog</div>
            </div>
            {/* <button onClick={ 제목바꾸기 }>제목바꾸기</button>
            <button onClick={ 제목정렬 }>제목정렬</button> */}
            {글제목.map(function (글, idx) {
                return (
                    <div className="list" key={idx}>
                        <h3
                            onClick={() => {
                                누른제목변경(idx);
                            }}
                        >
                            {글} <span onClick={()=>따봉플러스(idx)}> 👍 </span>
                            {따봉[idx]}
                        </h3>
                        <p>2월 19일 발행</p>
                        <hr />
                    </div>
                );
            })}

            <div className='publish'>
                <input onChange={ (e)=>{입력값변경(e.target.value)} } value={입력값} />
                <button onClick={글제목추가}>저장</button>
            </div>

            <button onClick={모달스위치}>열고닫기</button>
            {modal === true ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal> : null}
        </div>
    );
}

function Modal(props) {
    return (
        <div className="modal">
            <h2>{props.글제목[props.누른제목]}</h2>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    );
}

export default App;
