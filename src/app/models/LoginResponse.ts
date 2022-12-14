import { Roles } from "./Roles";

export interface LoginResponse{
  users: string;
  jwtToken: string;
  userName: string;
  roleName: string;
  expirationDate: number;
  roles: Roles;
}
