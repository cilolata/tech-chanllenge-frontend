// src/utils/toast.ts
import type { UseToastOptions } from "@chakra-ui/react";

export const toastDefaults: UseToastOptions = {
  position: "top-right",
  duration: 3500,
  isClosable: true,
  variant: "left-accent",
};

export function successToast(
  toast: (o: UseToastOptions) => void,
  title: string,
  description?: string
) {
  toast({ ...toastDefaults, status: "success", title, description });
}

export function errorToast(
  toast: (o: UseToastOptions) => void,
  title: string,
  description?: string
) {
  toast({ ...toastDefaults, status: "error", title, description });
}

export function infoToast(
  toast: (o: UseToastOptions) => void,
  title: string,
  description?: string
) {
  toast({ ...toastDefaults, status: "info", title, description });
}
