import { SetMetadata } from "@nestjs/common";
import { Role } from "./role.enum";

export const ROLE_Key='roles';
export const Roles=(...roles:Role[])=>SetMetadata(ROLE_Key,roles)