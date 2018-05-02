import { environment } from '../environments/environment';

export namespace appConfig {
  export const endpoints = {
    login: environment.apiUrl + 'login',
    loadAllClients: environment.apiUrl + 'clients/',
    loadClientById: environment.apiUrl + 'clients/:id',
    dispatchTaskToClient: environment.apiUrl + 'clients/:id'
  };
  export const constValues = {
    refreshingFrequency: 30 * 1000,
    notificationDuration: 5 * 1000
  }
}
