import { createContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    let loggedUser = localStorage.getItem("User");
    loggedUser = JSON.parse(loggedUser);

    if (token) {
      const verifyToken = async () => {
        try {
          let res = await fetch(
            "https://ecommerce-xw87.onrender.com/user/checkUserSession",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ email: loggedUser.email }),
            }
          );
          res = await res.json();

          if (res.status) {
            setUser(res.user);
            console.log("Session is Valid");
          } else {
            console.log("session is invalid");
            localStorage.removeItem("token");
            localStorage.removeItem("User");
          }
        } catch (err) {
          console.log("Error");
        } finally {
          setIsLoading(false);
        }
      };
      verifyToken();
    } else {
      console.log("Token is not provided");
      setIsLoading(false);
    }
  }, []);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
        <ScaleLoader color="#3498db" size={15} />
        <p className="mt-4 ">Loading, please wait...</p>
      </div>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
