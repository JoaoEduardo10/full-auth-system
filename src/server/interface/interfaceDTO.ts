export interface UserDTO {
  name: string;
  email: string;
  password: string;
  status?: "notAuthenticated" | "authenticated";
}
