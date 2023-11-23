import { ClearWaitingQueueParams, Id, toast, ToastContent, ToastOptions, ToastPromiseParams, UpdateOptions } from "react-toastify";

interface IToastTypeProps<TData = unknown> {
  content: ToastContent<TData>;
  options?: ToastOptions<Record<string, never>> | undefined;
}

export class ToastService {
  static success({ content, options = {} }: IToastTypeProps) {
    return toast.success(content, options);
  }

  static info({ content, options = {} }: IToastTypeProps) {
    return toast.info(content, options);
  }

  static error({ content, options = {} }: IToastTypeProps) {
    return toast.error(content, options);
  }

  static warning({ content, options = {} }: IToastTypeProps) {
    return toast.warning(content, options);
  }

  static loading({ content, options = {} }: IToastTypeProps) {
    return toast.loading(content, options);
  }

  static update<TData = unknown>(toastId: Id, options?: UpdateOptions<TData>) {
    toast.update(toastId, options);
  }

  static clearWaitingQueue(params?: ClearWaitingQueueParams) {
    toast.clearWaitingQueue(params);
  }

  static handlePromise(promise: Promise<unknown> | (() => Promise<unknown>), { pending, error, success }: ToastPromiseParams<unknown, unknown, unknown>) {
    return toast.promise(promise, {
      pending,
      success,
      error
    });
  }

  static checkIsActive(id: Id) {
    return toast.isActive(id);
  }

  static dismissById(id: Id) {
    toast.dismiss(id);
  }

  static dismissAll() {
    toast.dismiss();
  }
}
