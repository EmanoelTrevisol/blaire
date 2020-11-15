export interface ISetValueAction {
  type: typeof ActionTypes.SET_VALUE;
  payload: {
    value: string;
  };
}

export interface ISetDirtyAction {
  type: typeof ActionTypes.SET_DIRTY;
  payload: {
    dirty: boolean;
  };
}
export interface ISetErrorsAction {
  type: typeof ActionTypes.SET_ERRORS;
  payload: {
    error: boolean;
    errors: {
      valid?: boolean;
      required?: boolean;
    };
  };
}

export enum ActionTypes {
  SET_VALUE = 'SET_VALUE',
  SET_DIRTY = 'SET_DIRTY',
  SET_ERRORS = 'SET_ERRORS',
}

export type FormActionTypes =
  | ISetErrorsAction
  | ISetDirtyAction
  | ISetValueAction;
