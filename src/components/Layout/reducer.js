import states from './states';
import * as types from './actionType';

export default (state = states, action) => {
  switch (action.type) {
    // 更改Sidebar標記位置
    case types.CHANGE_ACTIVE:
      return {
        ...state,
        sidebar: {
          current: action.current,
        },
      };

    case types.LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case types.SPINNING:
      return {
        ...state,
        spinning: action.spinning,
      };

    case types.COLLAPSED:
      return {
        ...state,
        collapsed: action.collapsed,
      };

    case types.SET_MOBILE:
      return {
        ...state,
        isMobile: action.isMobile,
      };

    case types.DELETE_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          data: state.notice.data.filter(item => item.id !== action.id),
        },
      };

    case types.CLEAR_NOTICE:
      return {
        ...state,
        notice: {
          ...state.notice,
          data: [],
        },
      };

    default:
      return state;
  }
};
