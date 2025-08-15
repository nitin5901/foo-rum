import React, { useMemo } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import SignUp from "../../components/SignUp";

const SignupPage: React.FC = () => {
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
            <SignUp 
                visible={true} 
                onSignIn={() => navigate('/login', { replace: true })}
                onSignUpSuccess={() => navigate('/', { replace: true })}
            />
            </div>
        </div>
    );
}

export default SignupPage;