import { useState } from "react";

export const UserPage = () => {
  // Modal con:
  // configuración de usuario
  // logout

  const [user, setUser] = useState({
    id: 1,
    name: "Pipo"
  });

  
  function login(): void {
    
  }

  function logout(): void {
  }

  return (
    <div>
      UserPage
      {user ? <button onClick={login}>{toLocaleUpperCase(user.name)}</button> : <button onClick={logout}>Logout</button>}
    </div>
  );
};
