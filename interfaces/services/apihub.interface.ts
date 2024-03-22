export interface GetEndpoints {
  phrase: string;
  limit?: 3 | 30;
  token: "initial" | string;
  sequence: "next" | "prev";
}
