import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { User } from "./models/user";

interface TUserContext {
  loggedInUser: User | null;
  setLoggedInUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<TUserContext>({
  loggedInUser: null,
  setLoggedInUser: () => {},
});

interface Props {
  children?: ReactNode;
}

export function UserContextProvider({ children }: Props) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
}
