import { environment } from '../environments/environment';

export namespace appConfig {
  export const endpoints = {
    login: environment.apiUrl + 'login'
  }
}
