import {  createContext,  useContext,  useEffect,  useState,  ReactNode,} from "react";
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential,} from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<UserCredential | void>;
  signIn: (email: string, password: string) => Promise<UserCredential | void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = UserCredential.user;

    await setDoc(doc(db,"users", user.uid), {
      userId: user.uid,
      email: email,
      name: name,
      createdAt: new Date(),
    })

    return UserCredential
  };

  const signIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};