import { useDispatch,useSelector } from "react-redux"
import {filterList  } from "../reducers/filterReducer"
import  {connect} from "react-redux"


const FilterForm = (props) => {
const dispatch = useDispatch()

const handleChange = (event) => {

    props.filterList(event.target.value)
    //dispatch(filterList(event.target.value))
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
const mapDispatchToProps = {
    filterList,
  }

  const ConnectedFilterForm = connect(null,mapDispatchToProps)(FilterForm)
  export default ConnectedFilterForm

//export default FilterForm