import { SignUp } from "@clerk/nextjs";

const SignupPage = () => {
  return (
    <div className="h-screen flex justify-center items-center pt-16">
      <SignUp />
    </div>
  );
};

export default SignupPage;
