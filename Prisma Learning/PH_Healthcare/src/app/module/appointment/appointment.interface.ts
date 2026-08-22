import type { Role } from "../../../generated/prisma/enums";

export interface IUser {
	email: string;
	name: string;
	userId: string;
	role: Role;
}
