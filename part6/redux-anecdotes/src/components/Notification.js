import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import messageReducer from '../reducers/messageReducer'
const Notification = () => {
 
  const notification = useSelector(state => state.message)
  if (notification === null){
    return null
  }
 
  console.log(notification,'notificatin')
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

export default Notification