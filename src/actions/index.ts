
export const SET_THEME = 'SET_THEME';
export const updateTheme = async (theme: string) => {
  return {
    type: SET_THEME,
    data: theme,
  };
}

export const SET_API_URL = 'SET_API_URL';
export const updateApiUrl = async (url: string) => {
  return {
    type: SET_API_URL,
    data: url,
  };
}

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const updateUserInfo = async (data: object) => {
  return {
    type: UPDATE_USER_INFO,
    data,
  };
}