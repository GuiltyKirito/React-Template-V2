import states from './states';
import * as types from './actionType';

export default (state = states, action) => {
  switch (action.type) {
    // 登入
    case types.LOGIN:
      return {
        ...state,
        id: action.id,
        login: true,
        name: action.name,
        token: action.token,
        roles: action.roles,
        permissions: action.permissions,
      };

    // 登出
    case types.LOGOUT:
      return {
        ...state,
        id: '',
        login: false,
        name: '',
        token: null,
        roles: [],
        permissions: [],
      };

    // 設定腳色
    case types.SET_ROLES:
      return {
        ...state,
        roles: action.roles,
      };

    // 設定權限
    case types.SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.permissions,
      };

    default:
      return state;
  }
};
