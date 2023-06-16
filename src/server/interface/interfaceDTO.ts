export interface UserDTO {
  name: string;
  email: string;
  status?: "notAuthenticated" | "authenticated";
}
