import React, { createContext, useContext, useState } from 'react';

const GeneralContext = createContext();

export function ContextProvider({ children }) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <GeneralContext.Provider value={{ aboutOpen, setAboutOpen }}>
      {children}
    </GeneralContext.Provider>
  );
}

export function Context() {
  return useContext(GeneralContext);
}