import { Link } from "react-router-dom";
function Profile({ setUser }) {
  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("User");
  }
  return (
    <>
      <div className="absolute bg-white z-50 right-2 top-16 w-56 rounded-sm p-4 flex flex-col  text-[#434141]">
        <ul>
          <li className="hover:text-black">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/orders">Your Orders</Link>
          </li>
          <li className="hover:text-black">
            <button onClick={handleLogOut}>Log out</button>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Profile;
