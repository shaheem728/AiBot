import { createContext, ReactNode, useState } from "react";

// Define the type for the context value
interface UserContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

// Define the type for provider props
interface ProviderProps {
  children: ReactNode;
}

// Create the context with the correct type
const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
