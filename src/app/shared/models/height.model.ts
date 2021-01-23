import { BaseResourceModel } from './base-resource.model';

export interface Height extends BaseResourceModel {
  date: string;
  value: number;
  min?: number;
  max?: number;
}
