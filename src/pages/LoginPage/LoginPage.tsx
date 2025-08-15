import React, { useMemo } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Login";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const rightContent = useMemo(() => {
        return <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-bold" onClick={() => navigate('/')}>Back To Home</p>
        </div>
    }, [navigate]);
    return (
        <div className="bg-white flex flex-col items-center py-40 px-2 sm:px-10">
            <Header rightContent={rightContent} />
            <div className="flex flex-col items-center gap-4">
            <Login visible={true} onSignUp={() => navigate('/signup', { replace: true })}/>
            </div>
        </div>
    );
}

export default LoginPage;