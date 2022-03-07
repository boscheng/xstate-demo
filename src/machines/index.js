import { createContext } from "react";
import { createModel } from "xstate/lib/model";
import { spawn } from "xstate";
export const MachineContext = createContext();
const doLogin = async (context, event) => {
  const { username, password } = event;
  if (username !== "test" && password !== "123") {
    throw new Error("Wrong username or password!");
  }
  return { username, password };
};

const userModel = createModel(
  {
    user: undefined,
    error: undefined,
  },
  {
    events: {
      LOGIN: (user) => ({ user }),
    },
  }
);

export const userMachine = userModel.createMachine({
  id: "user",
  context: userModel.initialContext,
  initial: "init",
  states: {
    init: {},
    started: {
      invoke: {
        id: "login",
        src: doLogin,
        onDone: {
          target: "success",
          actions: userModel.assign({ user: (_, event) => event.data }),
        },
        onError: {
          target: "fail",
          actions: userModel.assign({ error: (_, event) => event.data }),
        },
      },
    },
    success: {},
    fail: {},
  },
  on: {
    LOGIN: {
      target: "started",
    },
  },
});
