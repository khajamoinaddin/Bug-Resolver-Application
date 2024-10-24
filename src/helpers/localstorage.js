const USER_ROLE = "role";
const USER_TOKEM = "accessToken";

// for token
export const setLocalStorageToken = (token) => {
  localStorage.setItem(USER_TOKEM, token);
};

export const removeLocalStorageToken = () => {
  localStorage.removeItem(USER_TOKEM);
};

export const getLocalStorageToken = () => {
  let v = localStorage.getItem(USER_TOKEM);
  return v;
};

// for role

export const setLocalStorageRole = (role) => {
  localStorage.setItem(USER_ROLE, role);
};

export const removeLocalStorageRole = () => {
  localStorage.removeItem(USER_ROLE);
};

export const getLocalStorageRole = () => {
  let v = localStorage.getItem(USER_ROLE);
  return v;
};
