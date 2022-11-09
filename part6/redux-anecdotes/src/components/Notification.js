import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import messageReducer from '../reducers/messageReducer'
import { connect } from 'react-redux'

const Notification = (props) => {
 
  const notification = props.message
  if (notification === null){
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    message: state.message
    
  }
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
//export default Notification