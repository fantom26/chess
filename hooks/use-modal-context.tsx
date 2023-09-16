import { useContext } from "react";

import { ModalContext } from "@contexts";

export const useModalContext = () => useContext(ModalContext);
