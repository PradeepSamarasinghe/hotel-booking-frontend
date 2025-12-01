import UserTag from "../userData/userdata.jsx";

function Header() {
    return (
        <header className="w-full h-25 bg-gray-500 flex relative items-center px-10 shadow-md">
            {/* Logo */}
            <img
            src="https://marketplace.canva.com/EAE0ZKOHNUM/1/0/800w/canva-luxury-crown-logo-vector-template-eHl8t59sdHc.jpg"
            alt="Hotel Logo"
            className="w-20 h-20 object-cover rounded-md"
            />
            <h1 className="text-white text-2xl">Hotel Management System</h1>
            <UserTag name="John Doe" imageLink="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" />

        </header>
    )
}

export default Header;