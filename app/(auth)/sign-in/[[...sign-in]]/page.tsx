import { SignIn } from "@clerk/nextjs";
const Page = () => {
  return (
    <div className="h-screen flex justify-center items-center pt-16">
      <SignIn />
    </div>
  );
};

export default Page;
