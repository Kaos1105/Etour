import { State } from '../reducers';
import { AdminState } from './reducers';

export const getAdminState = (store: State): AdminState => store.admin;
