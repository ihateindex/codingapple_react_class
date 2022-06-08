import { configureStore, createSlice } from '@reduxjs/toolkit';

// * useState같은 역할
// * state 하나를 slice라고 부름
let user = createSlice({
    name: 'user',
    initialState: { name : 'kim', age : 20},
    reducers: {
        changeName(state) {
            return 'john ' + state;
        },
        changeAge(state) {
            state.age++;
        }
    },
});

// * 아래에 사용된 문법은 오른쪽의 자료를 변수로 쉽게 넣기 위한 디스트럭쳐링 문법입니다.
export let { changeName, changeAge } = user.actions;

let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12],
});

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 },
    ],
    reducers: {
        changeCount(state, action) {
            state[action.payload.idx].count++;
        },
    },
});

export let { changeCount } = cart.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer,
    },
});
