import { BaseService } from './base/base.service';
import { HttpService } from './http.service';
import { AxiosResponse } from 'axios';

type Products = {
  userId: number;
  catId: number;
  data: {
    name: string;
    price: number;
    qtd: number;
  };
};
export const ProductsService = () => {
  const route = 'products';
  const { update, remove } = BaseService(route);

  const create = (
    userId: any,
    catId: any,
    data: any
  ): Promise<AxiosResponse<any>> => {
    return HttpService().post(`${route}/${userId}/${catId}`, data);
  };
  const getById = (id: any): Promise<AxiosResponse<any>> => {
    return HttpService().get(`${route}/byUser/${id}`);
  };

  return { update, create, getById, remove };
};
