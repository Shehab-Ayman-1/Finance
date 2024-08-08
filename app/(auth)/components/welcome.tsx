type AuthWelcomeProps = {};

export const AuthWelcome = ({}: AuthWelcomeProps) => {
    return (
        <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold text-[#3e3a47]">Welcome Back!</h1>
            <p className="text-base text-[#738ca0]">Login Or Create Account To Back To Your Dashboard</p>
        </div>
    );
};
