import { configureStore } from '@reduxjs/toolkit'

import messageSlice from './reducers/messageReducer'
import anecdoteSlice from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'

const store = configureStore ({
    reducer: {
    anecdotes:anecdoteSlice,
    message:messageSlice,
    filter:filterSlice
    }
    
})

console.log(store.getState())




export default store