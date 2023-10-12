/* eslint-disable import/named */
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";
import { FORM_FIELDS } from "../enums";

export const WelcomeFormObject = object({
  [FORM_FIELDS.ROOM_ID]: string()
    .matches(/^[0-9]+$/, "Must contain only numbers")
    .required("This field is required")
});

export const welcomeFormResolver = yupResolver(WelcomeFormObject);

export type WelcomeFormSchema = InferType<typeof WelcomeFormObject>;
