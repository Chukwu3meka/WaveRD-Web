export interface Validator {
  value: any;
  type: "email" | "password" | "handle" | "fullName";
  label?: string | null;
}
