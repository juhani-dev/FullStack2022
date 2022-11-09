
/*const initialState = 'zero'
const messageReducer = (state = initialState, action) => {
    console.log(action,'action messagereducer')
    switch (action.type){
        case 'NEW':
            state ='new'
            return state
        default:
           return state
    }
}
export default messageReducer*/

import { createSlice ,current} from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice ({
    name:'message',
    initialState,
    reducers:{
        newMessage(state,action) {
            console.log(state,'left rigth',action.payload)
            const line = action.payload
            state = line
            return line
        },
        zeroMessage(state,action) {
            state = null
            return state
        }

    }

})
export const {newMessage,zeroMessage} =messageSlice.actions
export default messageSlice.reducer
export const timer =(message,time)=>{
    let wait = 'wait'
  setTimeout(() => {
    wait = 'done'
  },time * 1000)
  console.log(wait,'wait')
}
export const setNotification = (message,time) => {
   
  
    const zero = zeroMessage(null)
    const send = newMessage(message)
    return async dispatch => { 
        dispatch(send)
  setTimeout(() => {
    dispatch(zero)
  }, time *1000 )
    }
}