import { createContext, useEffect, useState } from "react";

export let userDataContext = createContext();

export function UserDataContextProvider(props) {
  const [UserData, setUserData] = useState(null);
  function saveUserData() {
    const userToken = JSON.parse(localStorage.getItem("UserToken"));
    const userData = JSON.parse(localStorage.getItem("UserData"));
    if (userData && userToken) {
      setUserData(userData);
    }
  }

  useEffect(() => {
    saveUserData();
  }, []);

  return (
    <userDataContext.Provider value={{ UserData, setUserData, saveUserData }}>
      {props.children}
    </userDataContext.Provider>
  );
}
