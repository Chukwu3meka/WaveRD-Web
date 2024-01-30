export interface Validator {
  value: any;
  label?: string | null;
  type: "email" | "password" | "handle" | "name" | "comment" | "name" | "whatsapp";
}
