import SignUp from "../routes/SignUp";

export default function DefaultLayoutLogin() {
  return (
    <div className="flex w-full h-screen">
      <div className="bg-[url('../public/bg1.jpg')] bg-no-repeat bg-cover bg-center hidden relative lg:flex h-full w-1/2 justify-center items-center ">
        <div className="flex justify-center items-center h-screen"></div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <SignUp />
      </div>
    </div>
  );
}
