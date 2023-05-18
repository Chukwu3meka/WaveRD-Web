export interface Validator {
  value: any;
  type: "email" | "password" | "handle" | "fullName" | "comment";
  label?: string | null;
}
