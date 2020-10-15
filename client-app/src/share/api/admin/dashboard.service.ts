import request from '../base.service';

const url = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = (): Promise<any> =>
  request(url, 'GET', { baseUrl: '' } /* dont do this with same domain */);
