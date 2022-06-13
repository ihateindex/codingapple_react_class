import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js'

// * useState같은 역할
// * state 하나를 slice라고 부름
// let user = createSlice({
//     name: 'user',
//     initialState: { name : 'kim', age : 20},
//     reducers: {
//         changeName(state) {
//             return 'john ' + state;
//         },
//         changeAge(state, action) {
//             // * state가 object/array면 return없이 직접 수정해도 됩니다.
//             // * 그래서 state에 문자 하나만 담는다고해도 일부러 {}안에 담기도 합니다
//             // * 함수의 첫번째 파라미터는 state이며, 두번째 파라미터는 파라미터 전달을 위해 사용 할 수 있습니다.
//             // * 보통 action이라고 명명하는데 그 이유는, state 변경함수들을 보통 action이라고 부르기 때문입니다.
//             // * 정확한 파라미터 값 전달을 위해서는 action뒤에 payload를 붙여줘야합니다.
//             // * action.payload : state 변경함수의 화물(전달 받는 값)
//             // * payload : 화물,소포,택배 
//             state.age += action.payload;
//         }
//     },
// });

// * 아래에 사용된 문법은 오른쪽의 자료를 변수로 쉽게 넣기 위한 디스트럭쳐링 문법입니다.
// export let { changeName, changeAge } = user.actions;

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
        // * 구형
        // increaseCount(state, action) {
        //     // * action.payload를 {} 형식으로 세팅하고 그 안에 idx 값을 넣어 전달
        //     console.log(action.payload.id);
        //     state[action.payload.id].count++;
        // },
        // * 신형
        increaseCount(state, action) {
            // * action.payload를 {} 형식으로 세팅하고 그 안에 idx 값을 넣어 전달
            console.log(action.payload.id);
            // state.map((data) => {
            //     if(data.id == action.payload.id) {
            //         data.count += 1;
            //     }
            // })

            // * 코딩애플 방법 : find, findIndex 사용하기
            // * findIndex : array에서 원하는거 몇번째에 있나 찾아주는 함수
            let num = state.findIndex((data) => {
                // * data(즉 state)의 id와 action.payload.id가 같은 요소의 인덱스를 리턴
                return data.id === action.payload.id
            })
            state[num].count += 1;
        },
        decreaseCount(state, action) {
            state.map((data) => {
                if(data.id == action.payload.id) {
                    if(data.count == 1) {
                        console.log('최저 갯수')
                        return false;
                    } else {
                        data.count -= 1;
                    }
                }
            })
        },
        insertCart(state, action) {
            // * 중복 플래그 변수
            let overlap = false;
            // * 카트에 이미 제품이 있는지 검증
            state.map(data => {
                if(data.id == action.payload.id) {
                    data.count += 1;
                    overlap = true;
                }
            })

            // * 없을때
            if(overlap == false) {
                state.push(action.payload);
            }

            
        },
        deleteCart(state, action) {
            // console.log(state);
            // state.map((data, idx) => {
            //     if(data.id == action.payload.id) {
            //         // console.log(data[idx]);
            //         // console.log(state.length);
            //         // console.log(state[idx]);
            //         state.splice(state[idx], 1);
            //         // state.splice(data, 1);
            //     }
            // })

            return state.filter((data) => data.id != action.payload.id);

        }
    },
});

export let { decreaseCount, increaseCount, insertCart, deleteCart } = cart.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer,
    },
});
