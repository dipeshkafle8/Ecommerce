import { useContext } from "react";
import { UserContext } from "../Auth/AuthContext";
const UserProfile = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <div className="mt-20 flex flex-col items-center gap-y-8">
        <span className="text-5xl font-semibold">User Information</span>
        <div className="flex flex-col gap-y-4 border-2 text-xl p-4">
          <span>Name: {user.name}</span>
          <span>Email: {user.email}</span>
          <span>Role: {user.role}</span>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
