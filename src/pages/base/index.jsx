import { useMachine } from "@xstate/react";
import { baseMachine } from "../../machines/base";

const Base = () => {
  const [state, send] = useMachine(baseMachine);
  console.log("state: ", state.matches("enabled"));
  const { isDisabled } = state.context;
  const onClick = () => {
    send("CLICK");
  };
  return (
    <section>
      <h1>Base {`${isDisabled}`}</h1>
      <button
        onClick={onClick}
        className=" mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
      >
        点击一下
      </button>
    </section>
  );
};

export default Base;
