import { useContext } from "react";

import { ChessContext } from "utils/contexts";

export const useChessContext = () => useContext(ChessContext);
