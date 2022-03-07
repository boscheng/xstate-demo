import { useRef, useContext } from "react";
import { Navigate } from "react-router-dom";
import { MachineContext } from "../../machines";
const Login = () => {
  const username = useRef(null);
  const password = useRef(null);
  const [machine, sendToMachine] = useContext(MachineContext);
  const { error } = machine.context;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      username: username.current.value,
      password: password.current.value,
    };
    sendToMachine("LOGIN", userInfo);
  };

  return (
    <div className="mt-12">
      <div className="max-w-lg mx-auto">
        <h1 className="text-center  my-4 font-semibold text-black">Login</h1>
        <div className="w-80">
          <div className="mx-auto max-w-lg mb-1">
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="username"
              ref={username}
              placeholder="Username"
            />
          </div>
          <div className="mx-auto max-w-lg mt-2">
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              name="password"
              autoComplete="on"
              ref={password}
              type="password"
              placeholder="Password"
            />
          </div>
          {machine.matches("fail") && (
            <p className="text-red-400">{error.toString()}</p>
          )}
          <button
            onClick={handleSubmit}
            className=" mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          >
            Login
          </button>
          {machine.matches("success") && <Navigate to="/" />}
        </div>
      </div>
    </div>
  );
};
export default Login;
