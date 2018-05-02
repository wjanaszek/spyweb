import { environment } from '../environments/environment';

export namespace appConfig {
  export const endpoints = {
    login: environment.apiUrl + 'login',
    loadAllClients: environment.apiUrl + 'clients/'
  }
  export const constValues = {
    refreshingFrequency: 30 * 1000
  }
}
