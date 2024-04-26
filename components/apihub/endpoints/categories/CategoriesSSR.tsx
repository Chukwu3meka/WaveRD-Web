import ApihubService from "services/apihub.service";

import { CategoriesContainer } from ".";
import { ApiResponse } from "interfaces/services/shared.interface";
import { Category } from "interfaces/components/apihub/endpoints.interface";

const CategoriesSSR = async () => {
  const apihubService = new ApihubService();

  const categories: Category[] = await apihubService
    .getEndpointsCategories({ limit: 10 })
    .then(({ success, data }: ApiResponse<Category[]>) => {
      if (success && Array.isArray(data)) return data;
      return [];
    })
    .catch(() => []);

  return <CategoriesContainer categories={categories} />;
};

export default CategoriesSSR;
