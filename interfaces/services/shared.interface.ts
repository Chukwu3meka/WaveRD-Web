export interface ApiResponse<K> {
  success: boolean;
  message: string;
  data: K;
}
