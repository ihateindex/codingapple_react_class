import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

let 박스 = styled.div`
    padding: 20px;
`;

let 제목 = styled.h4`
    font-size: 25px;
`;

function Detail(props) {

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
    props.shoes.filter(function(elem) {
        if(elem.id === parseInt(id)) {
            shoe = elem;
        };
    });

    return (
        <div className="container">
            <박스>
                <제목>Detail</제목>
            </박스>
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+(shoe.id + 1)+".jpg"} width="100%" alt='' />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{shoe.title}</h4>
                    <p>{shoe.content}</p>
                    <p>{shoe.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                    <button className="btn btn-danger" onClick={()=>{
                        history.goBack();
                    }}>뒤로가기</button>
                </div>
            </div>
        </div>
    );
}

export default Detail;