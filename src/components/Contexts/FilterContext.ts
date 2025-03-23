import { createContext } from "react";


export const FilterContext = createContext<{ filters: string[], setFilters: React.Dispatch<React.SetStateAction<string[]>> }>({ filters: [], setFilters: () => { } });