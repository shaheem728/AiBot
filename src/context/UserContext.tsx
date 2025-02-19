import { createContext, ReactNode, useState } from "react";

// Define the type for the context value
interface UserContextType {
  startChat: boolean
  setStartChat: React.Dispatch<React.SetStateAction<boolean>>;
  optiont: boolean
  setOption: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define the type for provider props
interface ProviderProps {
  children: ReactNode;
}

// Create the context with the correct type
const UserContext = createContext<UserContextType | any>(null);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [startChat, setStartChat] = useState<boolean>(false);
  const [option,setOption] = useState<boolean>(false)
  return (
    <UserContext.Provider value={{ startChat, setStartChat,option,setOption }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
