import { createContext, useContext } from "react";

const GeneralContext = createContext(null);

export const useGeneralContext = () => useContext(GeneralContext);

export default GeneralContext;