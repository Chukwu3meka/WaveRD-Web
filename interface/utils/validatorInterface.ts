export interface Validator {
  value: any;
  label?: string | null;
  type: "email" | "password" | "handle" | "fullName" | "comment" | "name";
}
