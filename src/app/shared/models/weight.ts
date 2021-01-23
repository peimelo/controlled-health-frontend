import { BaseResourceModel } from './base-resource.model';

export interface Weight extends BaseResourceModel {
  date: string;
  value: number;
  min?: number;
  max?: number;
}
