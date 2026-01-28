import { createContext, useState, useContext } from "react";


type ChildrenProps = {
    children: React.ReactNode
}
interface AuthContextType {
    session: string | undefined;
    setSession?: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
    session: undefined,
    setSession: undefined
});
export const AuthContextProvider = ({ children }: ChildrenProps) => {
    const [session, setSession] = useState("Testing")

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}