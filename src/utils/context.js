import React, { createContext, useContext, useState } from 'react';

const GeneralContext = createContext();

export function ContextProvider({ children }) {

  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);

  return (
    <GeneralContext.Provider value={{ aboutOpen, setAboutOpen, searchVisible, setSearchVisible }}>
      {children}
    </GeneralContext.Provider>
  );
}

export function Context() {
  return useContext(GeneralContext);
}