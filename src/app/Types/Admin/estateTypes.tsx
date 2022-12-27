import { Nullable } from '@interfaces/Common/commonTypes';

import { CategoryDataType } from './categoryTypes';

export interface EstatePropertyDataType {
  id: number;
  name: string;
  category: CategoryDataType;
}

export interface EstatePropertyFormDataType extends Nullable<Partial<EstatePropertyDataType>> {
  categoryId: number | null;
}
