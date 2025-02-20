import { createContext, ReactNode, useState } from "react";

// Define the type for the context value
interface UserContextType {
  startChat: boolean
  setStartChat: React.Dispatch<React.SetStateAction<boolean>>;
  input:string
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

// Define the type for provider props
interface ProviderProps {
  children: ReactNode;
}

export let user = {
   data:any,
   mime_type:null,
   imgUrl:null,
}
export let prevUser={
  data:null,
  mime_type:null,
  prompt:null,
  imgUrl:null,
}
// Create the context with the correct type
const UserContext = createContext<UserContextType | any>(null);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [startChat, setStartChat] = useState<boolean>(false);
  const [input, setInput] = useState<string>('')
  return (
    <UserContext.Provider value={{ startChat, setStartChat,input,setInput}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
