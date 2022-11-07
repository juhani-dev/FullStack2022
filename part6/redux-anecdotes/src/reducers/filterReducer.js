import { createSlice ,current} from '@reduxjs/toolkit'
const initialState = 'zero'

const filterSlice = createSlice ({
    name:'filter',
    initialState,
    reducers: {
        filterList(state,action) {
            
            state = action.payload
            
            return state
        }
    }
})
export const {filterList} = filterSlice.actions
export default filterSlice.reducer