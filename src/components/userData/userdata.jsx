import axios from "axios";
import { useState , useEffect} from "react";
function UserTag(props){
    // console.log(props);
    // const token = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [userFound, setUserFound] = useState(false);
 
    useEffect(
        () => {

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
            setName(res.data.user.firstname + " " + res.data.user.lastName);
            setUserFound(true);
        }).catch((err) => {
            console.log(err);
        });  
        }else{
            setName("");
            setUserFound(false);
        }
        },[userFound]
    );

    return(
        <div className="bg-amber-200 absolute right-10 flex gap-2 items-center cursor-pointer">
            <img 
                className ="w-10 h-10 rounded-full "
                src={props.imageLink}
            />
            <span className="text-white mr-2 ">{name}</span>

            <button onClick={() => {
                localStorage.removeItem("token")
                setName("");
                setUserFound(false);
                // const token = localStorage.getItem("token")
                // console.log(token)
            }}>Logout</button>
        </div>
    )
}
export default UserTag;