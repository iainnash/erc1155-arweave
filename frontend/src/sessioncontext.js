import {createContext} from 'react';

export const SessionContext = createContext({
    loading: true,
    wallet: null,
    reloadSession: () => {},
});