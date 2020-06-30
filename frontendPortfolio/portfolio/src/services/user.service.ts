import { BaseService } from './base/base.service';
import { AxiosResponse } from 'axios';
import { HttpService } from './http.service';

export const Userservice = () => {
  const { create, get, getById, login, remove, update } = BaseService('user');

  const updateProfile = (
    id: number,
    data: any
  ): Promise<AxiosResponse<any>> => {
    return HttpService().put(`${'user'}/updateProfile/${id}`, data);
  };

  return {
    create,
    get,
    getById,
    login,
    remove,
    update,
    updateProfile,
  };
};
