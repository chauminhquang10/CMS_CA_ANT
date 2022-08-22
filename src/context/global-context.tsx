import { createContext, useContext } from 'react';
export type GlobalContent = Record<any, any>;
export const InquiryGlobalContext = createContext<GlobalContent>({});
export const useGlobalContext = () => useContext(InquiryGlobalContext);
