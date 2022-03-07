import { assign, createMachine } from "xstate";
import { sendParent } from "xstate/lib/actions";

export const baseMachine = createMachine({
  id: "base",
  initial: "disabled",
  context: {
    isDisabled: false,
  },
  states: {
    enabled: {
      initial: "idle",
      states: {
        idle: {
          on: {
            ON_CLICK: { target: "loading" },
          },
        },
        loading: {
          invoke: {
            id: "onload",
            src: (context, event) => {
              return new Promise((res) => res());
            },
            onDone: {
              target: "success",
            },
            onError: {
              target: "idle",
            },
          },
        },
        success: {
          invoke: {
            id: "success",
            src: (context, event) => {
              return new Promise((res, rej) => {
                if (!context.isDisabled) {
                  rej();
                } else {
                  res();
                }
              });
            },
            onDone: {
              target: "idle",
              actions: assign({ isDisabled: true }),
            },
            onError: {
              target: "fail",
              actions: assign({ isDisabled: false }),
            },
          },
        },
        fail: {
          after: {
            2000: {
              target: "idle",
            },
          },
        },
      },
      on: {
        CLICK: {
          target: "disabled",
        },
      },
    },
    disabled: {
      invoke: {
        id: "disabled",
        src: (context, event) => {},
        onDone: {
          target: "enabled",
        },
        onError: {
          target: "disabled",
        },
      },
      // on: {
      //   CLICK: {
      //     target: "enabled",
      //   },
      // },
    },
  },
});
