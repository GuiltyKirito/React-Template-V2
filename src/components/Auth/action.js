import * as types from './actionType';
// import auth from './../../requests/auth';
// import rsasign from 'jsrsasign';

/**
 * 登入
 * @param {string} username - 帳號
 * @param {string} password - 密碼
 */
/*
export const login = (username, password) => {
  return async dispatch => {
    try {
      const res = await auth.post('/sign', {
        username: username,
        password: password,
      });

      const JWS = rsasign.jws.JWS.parse(res.data.token);
      dispatch({
        type: types.LOGIN,
        id: JWS.payloadObj.sub,
        name: JWS.payloadObj.name,
        token: res.data.token,
        roles: res.data.roles,
        permissions: res.data.permissions,
      });

      localStorage.setItem('token', res.data.token);

      return {
        status: res.status,
        statusText: res.statusText,
      };
    } catch (error) {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }
  };
};
*/

/**
 * 假資料登入
 * @param {string} username - 帳號
 * @param {string} password - 密碼
 */
export const login = (username, password) => {
  return async dispatch => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    dispatch({
      type: types.LOGIN,
      id: 'id',
      name: 'name',
      token: null,
      roles: ['home'],
      permissions: ['all.home'],
    });

    localStorage.setItem('token', null);

    return {
      status: 200,
      statusText: 'success',
    };
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');

    dispatch({
      type: types.LOGOUT,
    });
  };
};
