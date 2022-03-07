import { assign, createMachine } from "xstate";
import { sendParent } from "xstate/lib/actions";

export const baseMachine = createMachine({
  id: "login",
  initial: "loggedout",
  context: {
    isDisabled: false,
  },
  states: {
    loggedin: {
      id: "loggedin",
      initial: "active",
      states: {
        idle: {
          on: {
            AUTO: {
              actions: sendParent("LOGOUT", { delay: 1000 }),
            },
          },
        },
        active: {
          on: {
            IDLE: {
              target: "idle",
            },
          },
        },
      },
      on: {
        LOOUT: {
          target: "loggedout",
        },
      },
    },
    loggedout: {
      id: "loggedout",
      type: "final",
      on: {
        LOGIN: {
          target: "loggedin",
        },
      },
    },
    on: {
      LOOUT: {
        target: "loggedout",
      },
    },
  },
});
