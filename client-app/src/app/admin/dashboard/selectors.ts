import { State } from '../../reducers';
import { getAdminState } from '../selectors';
import { DashboardState } from './reducers';

export const getDashboardState = (store: State): DashboardState =>
  getAdminState(store).dashboard;

export const getTest = (store: State): string => getDashboardState(store).test;

export const getUsers = (store: State): any[] => getDashboardState(store).users;

export const getLoading = (store: State): boolean =>
  getDashboardState(store).loading;
