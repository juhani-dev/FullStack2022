


import { createSlice } from '@reduxjs/toolkit'

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