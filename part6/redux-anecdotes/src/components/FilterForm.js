import { useDispatch,useSelector } from "react-redux"
import {filterList  } from "../reducers/filterReducer"
const FilterForm = () => {
const dispatch = useDispatch()
const filters = useSelector(state => state.filters)
const handleChange = (event) => {

    dispatch(filterList(event.target.value))
}
    return(
        <div>
           Filter <input
           type='text'
           
           onChange={(e)=> handleChange(e)}
           />
        </div>
    )
}
export default FilterForm