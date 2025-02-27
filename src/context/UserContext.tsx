import { createContext, ReactNode, useState } from "react";

// Define the type for the user object
interface User {
  data: null | string;
  mime_type: null | string;
  imgUrl: null | string;
  prompt?: null | string;
}

// Define the type for a chat object
interface Chat {
  chat: string;
  type: string;
}

// Define the type for the context value
interface UserContextType {
  startChat: boolean;
  setStartChat: React.Dispatch<React.SetStateAction<boolean>>;
  startRecentChat: boolean;
  setStartRecentChat: React.Dispatch<React.SetStateAction<boolean>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  showresult: string;
  setShowResult: React.Dispatch<React.SetStateAction<string>>;
  generateImageresult: string;
  setGenerateImageResult: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  prevUser: User;
  setPrevUser: React.Dispatch<React.SetStateAction<User>>;
  generateImage:string
  setGenerateImage:React.Dispatch<React.SetStateAction<string>>;
  recentChat: Chat[];
  setRecentChat: React.Dispatch<React.SetStateAction<Chat[]>>;
  recentInput:string;
  setRecentInput:React.Dispatch<React.SetStateAction<string>>
}

// Define the type for provider props
interface ProviderProps {
  children: ReactNode;
}

// Create the context with the correct type
const UserContext = createContext<UserContextType | any>(null);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [startChat, setStartChat] = useState<boolean>(false);
  const [startRecentChat, setStartRecentChat] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [showresult, setShowResult] = useState<string>('');
  const [generateImageresult, setGenerateImageResult] = useState<string>('');
  const [generateImage,setGenerateImage] = useState<string>('');
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

  // Correctly define recentChat as an array of Chat objects
  const [recentChat, setRecentChat] = useState<Chat[]>([]);
  const[recentInput,setRecentInput]= useState<string>('');
  return (
    <UserContext.Provider
      value={{
        startChat,
        setStartChat,
        startRecentChat, 
        setStartRecentChat,
        input,
        setInput,
        showresult,
        setShowResult,
        generateImageresult,
        setGenerateImageResult,
        user,
        setUser,
        prevUser,
        setPrevUser,
        generateImage,
        setGenerateImage,
        recentChat,
        setRecentChat,
        recentInput,
        setRecentInput
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
