import { createContext, useContext } from 'react';

// Shared UI state: the current page, the mobile menu, the order sheet, the sticky
// bar, and the person picked on the Home page.
export const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);
