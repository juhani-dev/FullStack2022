import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {  combineReducers } from 'redux'
import anecdoteService from './services/Anecdotes'
import messageSlice from './reducers/messageReducer'
import anecdoteSlice, { addObject } from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'

const store = configureStore ({
    reducer: {
    anecdotes:anecdoteSlice,
    message:messageSlice,
    filter:filterSlice
    }
    
})

console.log(store.getState())


anecdoteService.getAll().then(line =>
  line.forEach(note => {
    store.dispatch(addObject(note))
    
  })
)



export default store