import { COLLECTIONS } from "../enums";
import { TSelectOption } from "../validation";

export const MCollections: TSelectOption[] = Object.values(COLLECTIONS).map((c) => ({
  label: c,
  value: c
}));
