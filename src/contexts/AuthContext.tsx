import { getAuth, GithubAuthProvider, signOut } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, provider } from "../lib/firebase";
import { deleteUser, getUser, saveUser } from "../lib/localstorage";

interface AuthContextProps {
  authenticated: boolean;
  user: UserType | null;
  isAuthenticating: boolean;
  handleSignIn: () => void;
  handleSignOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export type UserType = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const localUser = getUser();
  const firebaseAuth = getAuth();

  const handleRecoverAuth = () => {
    setUser(localUser);
    setAuthenticated(true);
  };

  const handleSignIn = () => {
    setIsAuthenticating(true);

    auth
      .signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        if (token) {
          const newUser = {
            uid: user.uid,
            displayName: user.displayName!,
            email: user.email!,
            photoURL: user.photoURL,
          };

          setAuthenticated(true);
          setUser(newUser);
          saveUser(newUser);
        }
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsAuthenticating(false);
      });
  };

  const handleSignOut = () => {
    signOut(firebaseAuth)
      .then(() => {
        deleteUser();
        setAuthenticated(false);
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    if (localUser) {
      handleRecoverAuth();
    }
  }, [localUser?.uid]);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        isAuthenticating,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
