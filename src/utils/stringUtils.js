export const createUUID = () => {
  let result = '';
  let chars = '0123456789abcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i <= 24; i++)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export const regNotEmpty = text => {
  let notEmptyRex = /^(?!\s*$).+/;
  if (notEmptyRex.test(text)) {
    return true;
  }
  return false;
};

export const regEmail = text => {
  let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(text)) {
    return true;
  }

  return false;
};
