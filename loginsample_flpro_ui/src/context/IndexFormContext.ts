import {createContext, useContext} from 'react';

export type IndexFormContextType = {
	form: string,
	setForm: (f: string) => void
}

export const IndexFormContext = createContext<IndexFormContextType>({
	form: "login",
	setForm: () => {}
})

export const useIndexFormContext = () => useContext(IndexFormContext)
