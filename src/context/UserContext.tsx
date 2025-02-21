import { createContext, ReactNode, useState } from "react";

// Define the type for the user object
interface User {
  data: null | string;
  mime_type: null | string;
  imgUrl: null | string;
  prompt?: null | string;
}

// Define the type for the context value
interface UserContextType {
  startChat: boolean;
  setStartChat: React.Dispatch<React.SetStateAction<boolean>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  showresult: string;
  setShowResult: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  prevUser: User;
  setPrevUser: React.Dispatch<React.SetStateAction<User>>;
}

// Define the type for provider props
interface ProviderProps {
  children: ReactNode;
}

// Create the context with the correct type
const UserContext = createContext<UserContextType | any>(null);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [startChat, setStartChat] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [showresult,setShowResult] = useState<string>('');
  const [user, setUser] = useState<User>({
    data: null,
    mime_type: null,
    imgUrl: null,
    prompt: null,
  });
  const [prevUser, setPrevUser] = useState<User>({
    data: null,
    mime_type: null,
    imgUrl: null,
    prompt: null,
  });

  return (
    <UserContext.Provider
      value={{
        startChat,
        setStartChat,
        input,
        setInput,
        showresult,
        setShowResult,
        user,
        setUser,
        prevUser,
        setPrevUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
