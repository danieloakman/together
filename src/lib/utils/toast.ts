import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";

/** Wrapper for skeleton's `toastStore`. Adds useful default template toasts, like `error`, `success`, etc. */
export const toast = {
  ...toastStore,
  error: (message: string, options: Omit<ToastSettings, 'background' | 'message'> = {}) => {
    toastStore.trigger({
      message,
      background: 'bg-error-500',
      ...options
    });
  },
  success: (message: string, options: Omit<ToastSettings, 'background' | 'message'> = {}) => {
    toastStore.trigger({
      message,
      background: 'bg-success-500',
      ...options
    });
  },
  warning: (message: string, options: Omit<ToastSettings, 'background' | 'message'> = {}) => {
    toastStore.trigger({
      message,
      background: 'bg-warning-500',
      ...options
    });
  }
};
