import * as types from './actionType';

/**
 * 改變左邊sidebar所在的位置
 * @param {string} current - 現在所在之menu值
 */
export const changeActive = current => {
  return dispatch => {
    dispatch({
      type: types.CHANGE_ACTIVE,
      current,
    });
  };
};

/**
 * 顯示載入中..
 * @param {bool} loading - 是否顯示載入中..
 */
export const loading = loading => {
  return dispatch => {
    dispatch({
      type: types.LOADING,
      loading,
    });
  };
};

/**
 * 顯示通知訊息載入中...
 * @param {bool} spinning - 是否顯示載入中...
 */
export const spinning = spinning => {
  return dispatch => {
    dispatch({
      type: types.SPINNING,
      spinning,
    });
  };
};

/**
 * 摺疊sidebar
 * @param {bool} collapsed - 是否摺疊
 */
export const collapsed = collapsed => {
  return dispatch => {
    dispatch({
      type: types.COLLAPSED,
      collapsed,
    });
  };
};

/**
 * 設定是否為mobile
 * @param {bool} isMobile - 是否為mobile
 */
export const setMobile = isMobile => {
  return dispatch => {
    dispatch({
      type: types.SET_MOBILE,
      isMobile: !!isMobile,
    });
  };
};

/**
 * 刪除通知訊息
 * @param {number} id - 訊息ID
 */
export const deleteNotice = id => {
  return async dispatch => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    dispatch({
      type: types.DELETE_NOTICE,
      id,
    });
  };
};

/**
 * 清空通知訊息
 * @param {array} data - 所有的訊息ID
 */
export const clearNotice = data => {
  return async dispatch => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    dispatch({
      type: types.CLEAR_NOTICE,
    });
  };
};
