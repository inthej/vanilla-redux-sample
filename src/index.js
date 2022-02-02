// DOM 레퍼런스
import { createStore } from "redux";

const divToggle = document.querySelector('.toggle')
const counter = document.querySelector('h1')
const increaseBtn = document.querySelector('#increase')
const decreaseBtn = document.querySelector('#decrease')

// Action 타입
const TOGGLE_SWITCH = 'TOGGLE_SWITCH'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

// Action 생성함수 (type 값 필수)
const toggleSwitch = () => {
  return {
    type: TOGGLE_SWITCH
  }
}

const increase = difference => {
  return {
    type: INCREASE,
    difference
  }
}

const decrease = () => {
  return {
    type: DECREASE
  }
}

// 초기값 설정
const initialState = {
  toggle: false,
  count: 0
}

// 리듀서 함수 (변화를 일으키는 함수 // 불변성을 유지 // 순수함수)
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle
      }
    case INCREASE:
      return {
        ...state,
        count: state.count + action.difference
      }
    case DECREASE:
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

// 스토어 생성
const store = createStore(reducer)

// Render
const render = () => {
  const state = store.getState() // 현재상태를 불러온다
  if (state.toggle) {
    divToggle.classList.add('active')
  } else {
    divToggle.classList.remove('active')
  }

  counter.innerText = state.count
}

render()

// 구독하기 - 스토어 상태가 바뀔때마다 render 함수가 실행되도록 한다
store.subscribe(render)

// 디스패치 - 액셜 발생시키기
divToggle.onclick = () => {
  store.dispatch(toggleSwitch())
}

increaseBtn.onclick = () => {
  store.dispatch(increase(1))
}

decreaseBtn.onclick = () => {
  store.dispatch(decrease())
}