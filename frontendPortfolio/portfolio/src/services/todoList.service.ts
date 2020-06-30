import { BaseService } from './base/base.service';
import { HttpService } from './http.service';
import { AxiosResponse } from 'axios';

export const TodoListService = () => {
  const { update, remove, login, getById, get } = BaseService('todo');

  const getByUserId = (
    userId: number | string
  ): Promise<AxiosResponse<any>> => {
    return HttpService().get(`todo/byId/${userId}`);
  };

  const create = (userId: any, data: any): Promise<AxiosResponse<any>> => {
    return HttpService().post(`todo/${userId}`, data);
  };

  return { create, update, remove, login, getById, get, getByUserId };
};
