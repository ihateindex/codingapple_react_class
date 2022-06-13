import {createSlice} from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: { name : 'kim', age : 20},
    reducers: {
        changeName(state) {
            return 'john ' + state;
        },
        changeAge(state, action) {
            // * state가 object/array면 return없이 직접 수정해도 됩니다.
            // * 그래서 state에 문자 하나만 담는다고해도 일부러 {}안에 담기도 합니다
            // * 함수의 첫번째 파라미터는 state이며, 두번째 파라미터는 파라미터 전달을 위해 사용 할 수 있습니다.
            // * 보통 action이라고 명명하는데 그 이유는, state 변경함수들을 보통 action이라고 부르기 때문입니다.
            // * 정확한 파라미터 값 전달을 위해서는 action뒤에 payload를 붙여줘야합니다.
            // * action.payload : state 변경함수의 화물(전달 받는 값)
            // * payload : 화물,소포,택배 
            state.age += action.payload;
        }
    },
})

export let { changeName, changeAge } = user.actions;

export default user