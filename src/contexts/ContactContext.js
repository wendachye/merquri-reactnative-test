import React, {createContext, useContext} from 'react';

const ContactContext = createContext();

export const ContactProvider = ({value, children}) => {
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};

export default useContactContext = () => {
  return useContext(ContactContext);
};
