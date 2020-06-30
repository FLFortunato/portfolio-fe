import { BaseService } from './base/base.service';
import { AxiosResponse } from 'axios';
import { HttpService } from './http.service';

export const UtilService = () => {
  const { create } = BaseService('contact');

  return { create };
};
