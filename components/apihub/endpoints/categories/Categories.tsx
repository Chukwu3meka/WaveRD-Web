import apihubService from "services/apihub.service";

import { CategoriesContainer } from ".";
import { ApiResponse } from "interfaces/services/shared.interface";
import { Category } from "interfaces/components/apihub.interface";

const Categories = async () => {
  const categories: Category[] = await apihubService
    .getEndpointsCategories({ limit: 10 })
    .then(({ success, data }: ApiResponse) => {
      if (success && Array.isArray(data)) return data;
      return [];
    })
    .catch(() => []);

  return <CategoriesContainer categories={categories} />;
};

export default Categories;
