import { TSelectOption } from "@utils/validation";

export const generateSelectOptions = (obj: Record<string, string>): TSelectOption[] =>
  Object.values(obj).map((c) => ({
    label: c,
    value: c
  }));
