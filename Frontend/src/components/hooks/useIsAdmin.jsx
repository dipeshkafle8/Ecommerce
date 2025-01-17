import { useState, useEffect } from "react";
import axios from "axios";

const useIsAdmin = (user) => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (user) {
      //to check if the logged in user is admin or not
      const checkIsAdmin = async () => {
        let token = localStorage.getItem("token");
        token = JSON.parse(token);

        //without {} backend is getting undefined while accessing authorization
        if (token) {
          let response = await axios.post(
            "https://ecommerce-xw87.onrender.com/user/isAdmin",
            {},
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.status === 1) {
            setIsAdmin(true);
          } else {
            console.log(response.data.msg);
          }
        } else {
          console.log("Token not provided");
        }
      };

      checkIsAdmin();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return isAdmin;
};

export default useIsAdmin;
