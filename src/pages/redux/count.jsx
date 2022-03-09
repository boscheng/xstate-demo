import { connect } from "react-redux";
import { Add, Sub } from "./actions";
const Conut = (props) => {
  console.log("props: ", props);
  const add = () => {
    props.countAdd();
  };
  const sub = () => {
    props.countSub();
  };
  return (
    <div>
      <h1 className="mb-10 text-2xl">Redux demo</h1>
      <div className="flex justify-around items-center">
        <button
          className=" mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
          onClick={sub}
        >
          -
        </button>
        <div className="text-xl font-medium rounded-md px-6 ">
          {props.count}
        </div>
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

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    countAdd: (count) => {
      dispatch(Add);
    },
    countSub: (count) => {
      dispatch(Sub);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conut);
