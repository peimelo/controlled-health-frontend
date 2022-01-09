import { BaseResourceModel } from './base-resource.model';

export interface Weight extends BaseResourceModel {
  date: string;
  value: number;
  range: {
    min: number;
    max: number;
  };
}
