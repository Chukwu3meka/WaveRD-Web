type AllowedLimit = 3 | 10 | 20;

export interface GetEndpoints {
  page?: number;
  size: AllowedLimit;
  phrase?: string;
  category?: string;
  token?: null | string;
  sequence?: "next" | "prev";
  filter: "all" | "category" | "search";
}

export interface GetEndpointsCategories {
  limit: AllowedLimit;
}
