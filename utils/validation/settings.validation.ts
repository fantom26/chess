/* eslint-disable import/named */
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, boolean, object, string } from "yup";
import { FORM_FIELDS } from "../enums";

export const SelectOption = object({
  label: string().required(),
  value: string().required()
});

export const SettingsObject = object({
  [FORM_FIELDS.PEACE_THEME]: SelectOption.required("validations.required"),
  [FORM_FIELDS.BOARD_THEME]: SelectOption.required("validations.required"),
  [FORM_FIELDS.HIGHLIGHT_MOVE]: boolean()
});

export const settingsResolver = yupResolver(SettingsObject);

export type TSelectOption = InferType<typeof SelectOption>;
export type SettingsStageSchema = InferType<typeof SettingsObject>;
