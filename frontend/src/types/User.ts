export type UserRole = "CUSTOMER" | "STAFF" | "ADMIN";

export interface AuthUser {
  id: string;
  role: UserRole;
}
