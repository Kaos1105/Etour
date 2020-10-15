import { ThunkAction } from 'redux-thunk';
import { DashboardState } from './reducers';
import { getUsers } from '../../../share/api/admin/dashboard.service';

export enum DashboardAction {
  TEST_ACTION = '[Dashboard] Test action',
  TEST_USERS = '[Dashboard] Test users',
  TEST_USERS_SUCCESS = '[Dashboard] Test users success',
  TEST_USERS_FAILURE = '[Dashboard] Test users failure',
}

export interface TestAction {
  type: DashboardAction.TEST_ACTION;
  payload: string;
}

export interface TestUsers {
  type: DashboardAction.TEST_USERS;
  payload: any;
}

export interface TestUsersSuccess {
  type: DashboardAction.TEST_USERS_SUCCESS;
  payload: any;
}

export interface TestUsersFailure {
  type: DashboardAction.TEST_USERS_FAILURE;
  payload: any;
}

export const setTest = (test: string): TestAction => {
  return {
    type: DashboardAction.TEST_ACTION,
    payload: test,
  };
};

export const testUsers = (): ThunkAction<
  void,
  DashboardState,
  unknown,
  DashboardActionType
> => (dispatch) => {
  dispatch({ type: DashboardAction.TEST_USERS, payload: null });
  return getUsers()
    .then((response) => {
      dispatch(testUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(testUsersFailure(error));
    });
};

export const testUsersSuccess = (users: unknown): TestUsersSuccess => {
  return {
    type: DashboardAction.TEST_USERS_SUCCESS,
    payload: users,
  };
};

export const testUsersFailure = (errors: unknown): TestUsersSuccess => {
  return {
    type: DashboardAction.TEST_USERS_SUCCESS,
    payload: errors,
  };
};

export type DashboardActionType =
  | TestAction
  | TestUsers
  | TestUsersSuccess
  | TestUsersFailure;
