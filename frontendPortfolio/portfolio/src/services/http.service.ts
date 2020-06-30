import axios, { AxiosResponse } from 'axios';

export const HttpService = () => {
  const baseURL = 'http://localhost:5052/api';


  const getInstance = () => {

    const config = {
      baseURL,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    const connection = axios.create(config);

    return connection
  }




  const get = (url: string, params?: any): Promise<AxiosResponse<any>> => {
    const instance = getInstance();
    return instance.get(url, { params });
  }

  const put = (url: string, data: any): Promise<AxiosResponse<any>> => {
    const instance = getInstance();
    return instance.put(url, data);
  }

  const post = (url: string, data: any): Promise<AxiosResponse<any>> => {
    const instance = getInstance();
    return instance.post(url, data);
  }

  const remove = (url: string): Promise<AxiosResponse<any>> => {
    const instance = getInstance();
    return instance.delete(url);
  }

  return { get, put, post, remove }
}
