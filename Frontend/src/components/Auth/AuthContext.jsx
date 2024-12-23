import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const AuthProvider = async ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedUser = localStorage.getItem("User");
    if (token) {
      const verifyToken = async () => {
        try {
          let res = await fetch("http://localhost:3000/user/checkUserSession", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: loggedUser.email,
          });
          res = await res.json();
          console.log(res);
          if (res.status) {
            console.log("Session is Valid");
          }
        } catch (err) {
          console.log("Error");
        } finally {
          setIsLoading(false);
        }
      };
      verifyToken();
    }
  }, []);
  if (isLoading) {
    return <div>Loading.....</div>;
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
