import React, { createContext, useState } from 'react';
export const GlobalContext = createContext();

export const GlobalStateProvider = ({ children }) => {

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userOnBoarded, setUserOnBoarded] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState(true)
  const [passwordChanges, setPasswordChanges] = useState(true)
  const [specialOffers, setSpecialOffers] = useState(false)
  const [newsLetter, setNewsLetter] = useState(false)
  return (
    <GlobalContext.Provider value={{
      userName, setUserName,
      userEmail, setUserEmail,
      userPhone, setUserPhone,
      userAvatar, setUserAvatar,
      newsLetter, setNewsLetter,
      userLoggedIn, setUserLoggedIn,
      specialOffers, setSpecialOffers,
      userOnBoarded, setUserOnBoarded,
      deliveryStatus, setDeliveryStatus,
      passwordChanges, setPasswordChanges,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};