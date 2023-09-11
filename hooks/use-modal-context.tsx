import { useContext } from "react";

import { ModalContext } from "utils/contexts";

export const useModalContext = () => useContext(ModalContext);
