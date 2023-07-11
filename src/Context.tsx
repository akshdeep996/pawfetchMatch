import { createContext } from 'react';

type AgeContextType = [number, React.Dispatch<React.SetStateAction<number>>];
type BreedsContextType = [string[], React.Dispatch<React.SetStateAction<string[]>>];
type FavDogsContextType = [string[], React.Dispatch<React.SetStateAction<string[]>>];
type UserNameContextType = [string, React.Dispatch<React.SetStateAction<string>>];

export const AgeMinContext = createContext<AgeContextType>([0, () => {}]);
export const AgeMaxContext = createContext<AgeContextType>([0, () => {}]);
export const BreedsContext = createContext<BreedsContextType>([[], () => {}]);
export const FavDogsContext = createContext<FavDogsContextType>([[], () => {}]);
export const UserNameContext = createContext<UserNameContextType>(["", () => {}]);
