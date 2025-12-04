import axios from "axios";
function UserTag(props){
    // console.log(props);
    // const token = localStorage.getItem("token");

    const token = localStorage.getItem("token");
 
    if(token != null){
        // console.log("UserTag Token:", token);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("UserTag User Data:", res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    return(
        <div className="bg-amber-200 absolute right-10 flex gap-2 items-center cursor-pointer">
            <img 
                className ="w-10 h-10 rounded-full "
                src={props.imageLink}
            />
            <span className="text-white mr-2 ">{props.name}</span>
        </div>
    )
}
export default UserTag;