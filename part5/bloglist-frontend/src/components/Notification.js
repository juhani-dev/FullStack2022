const Notification = ({message}) => {
    if(message === null){
        return null
    }else{
    return (
        <div className="error">
            {message}
        </div>
    )
    }
}
const BlogCreatedNotification =({message}) => {
    if(message === null){
        return null
    }else{
    return (
        <div className="success">
            {message}
        </div>
    )
    }

}
export default (Notification, BlogCreatedNotification)