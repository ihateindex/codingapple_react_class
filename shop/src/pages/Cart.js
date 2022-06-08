import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeCount, changeName, changeAge } from './../store.js';

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

    return (
        <div>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{
                dispatch(changeAge())
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(function (cart, idx) {
                        return (
                            <tr key={idx}>
                                <td>{idx}</td>
                                <td>{cart.name}</td>
                                <td>{cart.count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(changeCount({idx: idx}))
                                    }}>+</button>
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
