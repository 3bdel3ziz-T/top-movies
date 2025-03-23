import { createContext } from "react";
import { Movie } from "../../../public/types/movie";

export const MovieDetailsContext = createContext<Movie>({} as Movie);