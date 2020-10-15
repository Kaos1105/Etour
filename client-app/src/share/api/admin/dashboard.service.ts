import request from '../base.service';

const url = 'https://jsonplaceholder.typicode.com/users';
const tourUrl = '/tours';

export const getUsers = (): Promise<any> =>
  request(url, 'GET', { baseUrl: '' } /* dont do this with same domain */);

export const getTours = (): Promise<any> => request(tourUrl, 'GET');
