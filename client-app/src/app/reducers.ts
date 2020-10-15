import { combineReducers } from 'redux';
import AdminReducer, { AdminState } from './admin/reducers';

export interface State {
  admin: AdminState;
}

export default combineReducers({
  admin: AdminReducer,
});
