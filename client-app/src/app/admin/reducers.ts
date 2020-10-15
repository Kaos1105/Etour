import { combineReducers } from 'redux';
import DashboardReducer, { DashboardState } from './dashboard/reducers';

export interface AdminState {
  dashboard: DashboardState;
}

export default combineReducers({
  dashboard: DashboardReducer,
});
