import { createMachine, assign } from "xstate";
// const promiseMachine = createMachine({
//   id: "promise",
//   initial: "pending",
//   states: {
//     pending: {
//       on: {
//         RESOLVE: { target: "resolved" },
//         REJECT: { target: "rejected" },
//       },
//     },
//     resolved: {
//       type: "final",
//     },
//     rejected: {
//       type: "final",
//     },
//   },
// });

// const skipMachine = createMachine({
//   id: "skip",
//   initial: "one",
//   states: {
//     one: {
//       on: { CLICK: "two" },
//     },
//     two: {
//       // 一旦进入状态，null 事件 '' 总是发生立即转换为 'three'
//       on: { "": "three" },
//     },
//     three: {
//       type: "final",
//     },
//   },
// });

// const { initialState } = skipMachine;
// const nextState = skipMachine.transition(initialState, "CLICK");

// console.log(nextState.value);

// const isAdult = ({ age }) => age >= 18;
// const isMinor = ({ age }) => age < 18;

const ageMachine = createMachine(
  {
    id: "age",
    context: { age: undefined }, // age 不知道
    initial: "unknown",
    states: {
      unknown: {
        always: [
          { target: "adult", cond: "isAdult" },
          { target: "child", cond: "isMinor" },
        ],
        on: {
          // 当满足 cond 条件时，立即 转换。 否则，不会发生 转换
          AWARD_POINTS: {
            actions: assign({ age: 28 }),
          },
        },
      },
      adult: { type: "final" },
      child: { type: "final" },
    },
  },
  {
    guards: {
      isAdult: ({ age }) => age >= 18,
      isMinor: ({ age }) => age < 18,
    },
  }
);

console.log(ageMachine.initialState.value);
// => 'unknown'
