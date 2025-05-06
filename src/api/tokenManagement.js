export const setCookie = (name, value, expiration) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (expiration || 0));
  
    const cookieValue =
      encodeURIComponent(value) +
      (expiration ? `; expires=${expirationDate.toUTCString()}` : "");
  
    document.cookie = `${name}=${cookieValue}; path=/`;
  };
  
export const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
  
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  
    return null;
};
  
export const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getToken = (tokenName) => {
  return getCookie(tokenName);
};

export const setToken = (tokenName, tokenValue, expiration) => {
  setCookie(tokenName, tokenValue, expiration);
};

export const removeToken = (tokenName) => {
  removeCookie(tokenName);
};

export const setTokens = (tokens) => {
  setToken(
    'accessToken',
    tokens.access,
    getTokenExpirationTime(tokens.access_expiration)
  );
  setToken(
    'refreshToken',
    tokens.refresh,
    getTokenExpirationTime(tokens.refresh_expiration)
  );
};

export const getTokenExpirationTime = (expirationTime) => {
  return new Date(expirationTime || 0).getTime();
};

export const isAccessTokenValid = () => {
  return !!getCookie('accessToken');
};

export const isRefreshTokenValid = () => {
  return !!getCookie('refreshToken');
};

export const removeTokens = () => {
  removeToken('accessToken');
  removeToken('refreshToken');
};

export const getAccessToken = () => getToken('accessToken');
export const getRefreshToken = () => getToken('refreshToken');

