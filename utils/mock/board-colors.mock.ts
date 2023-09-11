import { BOARD_COLORS } from "../enums";
import { TSelectOption } from "../validation";

export const MBoardColors: TSelectOption[] = Object.values(BOARD_COLORS).map((c) => ({
  label: c,
  value: c
}));
