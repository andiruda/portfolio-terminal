import React, { useState } from 'react';

export const StoreContext: any = React.createContext(null);

export default ({ children }: any) => {
  const [ buffer, setBuffer ] = useState([]);

  const store = {
    buffer: [ buffer, setBuffer ],
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}