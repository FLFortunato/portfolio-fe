import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import { HttpService } from '../http.service';
export const BaseService = (url: string) => {
  const get = () => {
    return HttpService().get(url);
  };

  const create = (data: any): Promise<AxiosResponse<any>> => {
    return HttpService().post(url, data);
  };

  const update = (id: number, data: any): Promise<AxiosResponse<any>> => {
    return HttpService().put(`${url}/${id}`, data);
  };

  const getById = (id: any): Promise<AxiosResponse<any>> => {
    return HttpService().get(`${url}/${id}`);
  };

  const remove = (id: number): Promise<AxiosResponse<any>> => {
    return HttpService().remove(`${url}/${id}`);
  };

  const login = (data: any): Promise<AxiosResponse<any>> => {
    return HttpService().post(`${url}/login`, data);
  };

  return { get, create, login, update, getById, remove };
};
