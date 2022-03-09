import { useDispatch, useSelector } from "react-redux";
import { actions } from "./store";
const Conut = (props) => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const add = () => {
    dispatch(actions.add());
  };
  const sub = () => {
    dispatch(actions.sub());
  };

  return (
    <div>
      <h1 className="mb-10 text-2xl">Redux toolkit demo</h1>
      <div className="flex justify-around items-center">
        <button
          className=" mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          onClick={sub}
        >
          -
        </button>
        <div className="text-xl font-medium rounded-md px-6 ">{count}</div>
        <button
          className=" mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          onClick={add}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Conut;
