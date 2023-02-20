export interface IValidator {
  value: any;
  type: "email" | "password" | "handle" | "fullName";
  label?: string | null;
}
