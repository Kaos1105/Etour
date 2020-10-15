import { DashboardAction, DashboardActionType } from './actions';

export interface DashboardState {
  test: string;
  users: any[];
  loading: boolean;
}

export const initialState: DashboardState = {
  test: 'OKAY',
  users: [],
  loading: false,
};

const dashboardReducers = (
  state = initialState,
  action: DashboardActionType,
): DashboardState => {
  switch (action.type) {
    case DashboardAction.TEST_ACTION:
      return {
        ...state,
        test: action.payload,
      };

    case DashboardAction.TEST_USERS:
      return {
        ...state,
        loading: true,
      };

    case DashboardAction.TEST_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case DashboardAction.TEST_USERS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default dashboardReducers;
