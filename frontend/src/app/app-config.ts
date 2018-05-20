import { environment } from '../environments/environment';

export namespace appConfig {
  export const endpoints = {
    login: environment.apiUrl + 'login',
    loadAllUsers: environment.apiUrl + 'users',
    loadUserById: environment.apiUrl + 'users/:id',
    dispatchTaskToUser: environment.apiUrl + 'users/:id'
  };
  export const constValues = {
    refreshingFrequency: 15 * 1000,
    notificationDuration: 5 * 1000
  }
}
