import action from "../../../../store/actions";

export function setItem(value) {
  return (dispatch) => {
    dispatch({
      type: action.SET.ITEM,
      payload: value,
    });
  };
}

export function clearItem() {
  return (dispatch) => {
    dispatch({
      type: action.CLEAR.ITEM,
      payload: null,
    });
  };
}

export function setClient(value) {
  return (dispatch) => {
    dispatch({
      type: action.SET.CLIENT,
      payload: value,
    });
  };
}

export function clearClient() {
  return (dispatch) => {
    dispatch({
      type: action.CLEAR.CLIENT,
      payload: null,
    });
  };
}

export function setUser(value) {
  return (dispatch) => {
    dispatch({
      type: action.SET.USER,
      payload: value,
    });
  };
}

export function clearUser() {
  return (dispatch) => {
    dispatch({
      type: action.CLEAR.USER,
      payload: null,
    });
  };
}

export function setContract(value) {
  return (dispatch) => {
    dispatch({
      type: action.SET.CONTRACT,
      payload: value,
    });
  };
}

export function clearContract() {
  return (dispatch) => {
    dispatch({
      type: action.CLEAR.CONTRACT,
      payload: null,
    });
  };
}
