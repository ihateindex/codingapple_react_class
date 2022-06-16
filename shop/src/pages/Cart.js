import {memo, useState} from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount, deleteCart } from './../store.js';
import { changeName, changeAge } from './../store/userSlice.js';

let Child = memo(function() {
    console.log('재랜더링됨')
    return <div>자식임</div>
})

function Cart() {
    // * Redux store를 가져와주는 useSelector()
    let state = useSelector((state) => {
        return state;
    });
    console.log(state);
    // * sotre의 개별 state를 가져와 사용하려면
    let user = useSelector((state) => {
        return state.user;
    });
    console.log(user);
    let cart = useSelector((state) => {
        return state.cart;
    });
    console.log(cart);

    let dispatch = useDispatch()

    let [count, setCount] = useState(0)

    return (
        <div>
            <Child count={count}></Child>
            <button onClick={()=>{setCount(count+1)}}>+</button>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{
                dispatch(changeAge(1))
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(function (cart, idx) {
                        return (
                            <tr key={idx}>
                                <td>{cart.id}</td>
                                <td>{cart.name}</td>
                                <td>{cart.count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(decreaseCount({id: cart.id}))
                                    }}>-</button>
                                    <button onClick={()=>{
                                        dispatch(increaseCount({id: cart.id}))
                                    }}>+</button>
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(deleteCart({id: cart.id}))
                                    }}>x</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default Cart;
