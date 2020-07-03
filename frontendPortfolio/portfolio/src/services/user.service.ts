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

  const forgotPass = (data: any): Promise<AxiosResponse<any>> => {
    return HttpService().post(`${'user'}/forgotpass/pass`, data);
  };

  const resetPass = (data: any): Promise<AxiosResponse<any>> => {
    return HttpService().put(`${'user'}/resetpass/pass`, data);
  };

  return {
    create,
    get,
    getById,
    login,
    remove,
    update,
    updateProfile,
    forgotPass,
    resetPass,
  };
};
