/* eslint-disable import/named */
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";
import { FORM_FIELDS } from "../enums";

export const JoinGameObject = object({
  [FORM_FIELDS.NAME]: string().required("validations.required"),
  [FORM_FIELDS.GAME_ID]: string()
    .matches(/^[0-9]+$/, "validations.mustBeNumber")
    .required("validations.required")
});

export const JoinGameResolver = yupResolver(JoinGameObject);

export type JoinGameSchema = InferType<typeof JoinGameObject>;

export const JoinGameDefaultValues = {
  [FORM_FIELDS.NAME]: "",
  [FORM_FIELDS.GAME_ID]: ""
};
