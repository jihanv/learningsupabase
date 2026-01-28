import { useAuth } from "../context/AuthContext";

const Signin = () => {
    const { session } = useAuth()
    console.log(session)
    return (
        <>
            <h1 className="landing-header">Paper Like A Boss</h1>
        </>
    );
};

export default Signin;