import { useState, createContext, useContext } from "react";
import { AuthContext } from "./auth.context";
import { get } from "../services/authService";

const ThisUserContext = createContext({
    thisUser: [],
    fetchThisUser: () => {}
})

const ThisUserProvider = ({children}) => {

    const { user } = useContext(AuthContext)

    const [thisUser, setThisUser] = useState([])

    const fetchThisUser = async () => {
        try {
          const response = await get(`/users/profile/${user?._id}`);
          setThisUser(response.data);
        } catch (error) {
          console.error(error.response);
        }
      };

  return (
    <ThisUserContext.Provider value={{thisUser, setThisUser, fetchThisUser}}>
        {children}
    </ThisUserContext.Provider>
  )
}

export { ThisUserProvider, ThisUserContext }