import { createContext, useState, useContext, useEffect } from "react";
import supabase from '../supabase-client';
import type { Session } from "@supabase/supabase-js";


type ChildrenProps = {
    children: React.ReactNode
}
interface AuthContextType {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: ChildrenProps) => {
    const [session, setSession] = useState<Session | null>(null)


    // Check on 1st render for session (getSession())
    useEffect(() => {
        async function getInitialSession() {

            try {
                const { data, error } = await supabase.auth.getSession()

                if (error) {
                    throw error
                }
                console.log(data.session)
                setSession(data.session)
            } catch (error) {
                console.error("Error fetching metrics: ", error)
            }
        }

        getInitialSession()

        // 2 listen for changes (onAuthStateChange)
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log('Session changed:', session);
        })
    }, [])


    // Listen for changes in auth state
    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside <AuthContextProvider>");
    }
    return ctx;
}