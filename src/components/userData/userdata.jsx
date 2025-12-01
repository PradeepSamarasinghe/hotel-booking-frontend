
function UserTag(props){
    // console.log(props);

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