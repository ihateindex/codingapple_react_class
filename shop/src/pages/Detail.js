import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './Detail.scss';
import { Nav } from 'react-bootstrap';

import {Context1} from '../App.js'
import { insertCart } from './../store.js';

let 박스 = styled.div`
    padding: 20px;
`;

let 제목 = styled.h4`
    font-size: 25px;
    color: ${(props) => props.색상};
`;

function Detail(props) {

    let {재고} = useContext(Context1);

    let [탭, 탭변경] = useState(0);
    let [alert1, setAlert1] = useState(true);
    // * 리액트 라이프싸이클
    // * useEffect는 sideEffect의 명칭에서 따온 이름, 마운트와 업데이트시에 작동
    // * html이 렌더링 된 후에 useEffect에 작성한 기능들이 실행되게끔 해주므로, 어려운 연산이나 오래걸리는 서버 통신 작업등을 대부분 여기에 넣어서 실행해 html이 먼저 빠르게 렌더링되도록 해줌
    useEffect(() => {
        let a = setTimeout(function () {
            setAlert1(false);
        }, 2000);

        return () => {
            clearTimeout(a);
        };
    }, []);

    let { id } = useParams();
    let history = useHistory();
    // ! url 파라미터 id 값으로 배열의 index를 넣어서 사용할때 배열이 sort()등으로 정렬되어버리면 index에 맞는 내용이 바뀜
    // ! 하지만 상세페이지의 id는 절대값으로 사용해야하기에 변경되어선 안됨
    // ! index가 아닌 배열안의 id 값은 직접 넣은 것이기에 sort() 등에 바뀌지 않음
    // ? 그렇다면 배열안의 id값과 url 파라미터의 id 값이 같은 요소를 가져오려면 어떻게 해야하는가?
    // * 내 답안
    // let shoe;
    // props.shoes.map(function(elem, idx) {
    //     if(elem.id === parseInt(id)) {
    //         console.log("같음");
    //         shoe = elem;
    //     }
    // });
    // * 코딩애플 답안
    // * ES6 신문법 find() 사용
    // let shoe = props.shoes.find(function(elem) {
    //     return elem.id === parseInt(id)
    // });

    // * 또 다른 방법
    // * filter() 사용
    let shoe;
    props.shoes.filter(function (elem) {
        if (elem.id === parseInt(id)) {
            shoe = elem;
        }
    });

    let [change, setChange] = useState(false);

    // let onChange = (e) => {
    //     console.log(e.target.value);
    //     isNaN(e.target.value) == true ? setChange(true) : setChange(false);
    // };

    let [num, setNum] = useState('');

    useEffect(() => {
        if (isNaN(num) == true) {
            // alert('그러지마세요');
            setChange(true);
        } else {
            setChange(false);
        }
    }, [num]);

    let [fade2, setFade2] = useState('');

    useEffect(() => {
        let timer = setTimeout(()=>{
            setFade2('end')
        }, 100)
        return () => {
            clearTimeout(timer);
            setFade2('')
        }
    }, []);

    let dispatch = useDispatch()

    return (
        <div className={"container start " + fade2}>
            <박스>
                <제목 className="red">Detail</제목>
                {/* // * styled-components를 이용한 class없는 CSS스타일링 */}
                {/* <제목 색상={'red'}>Detail</제목> */}
                {/* // * 문자만 전송한다면 props에 중괄호를 사용하지 않아도 됨 */}
                {/* <제목 색상="blue">Detail</제목> */}
                {/* // * END styled-components를 이용한 class없는 CSS스타일링 */}
            </박스>
            {/* <div className='my-alert my-alert2'>
                <p>재고가 얼마 남지 않았습니다</p>
            </div> */}
            {alert1 == true ? <div className="alert alert-warning">2초이내 구매시 할인</div> : null}
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (shoe.id + 1) + '.jpg'} width="100%" alt="" />
                </div>
                {change == true ? <div className="alert alert-warning">숫자를 입력해주세요.</div> : null}
                {/* <input onChange={onChange}></input> */}
                {/* <input onChange={(e) => {setNum(e.target.value);}} /> */}
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{shoe.title}</h4>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}원</p>
                    <button className="btn btn-danger" onClick={()=> {
                        dispatch(insertCart({id: shoe.id, name: shoe.title, count: 1}))
                    }}>주문하기</button>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        뒤로가기
                    </button>
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            탭변경(0);
                        }}
                        eventKey="link0"
                    >
                        버튼0
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            탭변경(1);
                        }}
                        eventKey="link1"
                    >
                        버튼1
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            탭변경(2);
                        }}
                        eventKey="link2"
                    >
                        버튼2
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭} shoes={props.shoes} />
        </div>
    );
}
function TabContent({탭, shoes}) {
    // if (탭 === 0){
    //   return <div>내용0</div>
    // }
    // if (탭 === 1){
    //     return  <div>내용1</div>
    // }
    // if (탭 === 2){
    //     return  <div>내용2</div>
    // }
    console.log(shoes);
    let [fade, setFade] = useState('');
    // * 디스트럭처링 문법
    let {재고} = useContext(Context1);

    useEffect(() => {
        let timer = setTimeout(()=>{
            setFade('end')
        }, 100)
        return () => {
            clearTimeout(timer);
            setFade('')
        }
    }, [탭]);

    return <div className={'start ' + fade}>
            {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
        </div>;
}

export default Detail;
