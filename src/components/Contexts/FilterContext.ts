import { createContext, useContext } from "react";


export const FilterContext = createContext<{ filters: { id: number, name: string}[], setFilters: React.Dispatch<React.SetStateAction<{ id: number, name: string}[]>> }>({ filters: [], setFilters: () => { } });

export const useFilterContext = () => {
  if (!FilterContext) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return useContext(FilterContext);
};