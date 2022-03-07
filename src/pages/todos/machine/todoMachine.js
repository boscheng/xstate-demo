import { sendParent } from "xstate";
import { createModel } from "xstate/lib/model";

const todoModel = createModel(
  {
    id: "",
    title: "",
    prevTitle: "",
    completed: false,
  },
  {
    events: {
      /** 切换完成 */
      TOGGLE_COMPLETE: () => ({}),
      /** 删除任务 */
      DELETE: () => ({}),
      /** 设置完成 */
      SET_COMPLETED: () => ({}),
      /** 设置为激活 */
      SET_ACTIVE: () => ({}),
      /** 编辑中 */
      EDIT: () => ({}),
      /** 变更值 */
      CHANGE: (value) => ({ value }),
      /** 提交 */
      COMMIT: () => ({}),
      /** 失去焦点 */
      BLUR: () => ({}),
      /** 取消 */
      CANCEL: () => ({}),
    },
  }
);

export const createTodoMachine = ({ id, title, completed }) => {
  return todoModel.createMachine(
    {
      id: "todo",
      initial: "reading",
      context: {
        id,
        title,
        completed,
        prevTitle: title,
      },
      on: {
        TOGGLE_COMPLETE: {
          actions: [
            todoModel.assign(
              { completed: true },
              sendParent((context) => ({ type: "TODO.COMMIT", todo: context }))
            ),
          ],
        },
        DELETE: "deleted",
      },
      states: {
        reading: {
          on: {
            SET_COMPLETED: {
              actions: [todoModel.assign({ completed: true }), "commit"],
            },
            TOGGLE_COMPLETE: {
              actions: [
                todoModel.assign({
                  completed: (context) => !context.completed,
                }),
                "commit",
              ],
            },
            SET_ACTIVE: {
              actions: [todoModel.assign({ completed: false }), "commit"],
            },
            EDIT: {
              target: "editing",
              actions: "focusInput",
            },
          },
        },
        editing: {
          entry: todoModel.assign({ prevTitle: (context) => context.title }),
          on: {
            CHANGE: {
              actions: todoModel.assign({
                title: (context, event) => event.value,
              }),
            },
            COMMIT: [
              {
                target: "reading",
                actions: sendParent((context) => ({
                  type: "TODO.COMMIT",
                  todo: context,
                })),
                cond: (context) => context.title.trim().length > 0,
              },
              { target: "deleted" },
            ],
            BLUR: {
              target: "reading",
              actions: sendParent((context) => ({
                type: "TODO.COMMIT",
                todo: context,
              })),
            },
            CANCEL: {
              target: "reading",
              actions: todoModel.assign({
                title: (context) => context.prevTitle,
              }),
            },
          },
        },
        deleted: {
          type: "final",
          entry: sendParent((context) => ({
            type: "TODO.DELETE",
            id: context.id,
          })),
        },
      },
    },
    {
      actions: {
        commit: sendParent((context) => ({
          type: "TODO.COMMIT",
          todo: context,
        })),
        focusInput: () => {},
      },
    }
  );
};
