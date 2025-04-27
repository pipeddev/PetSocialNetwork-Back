import { Pet } from "@prisma/client";

export class PetFriendResponse{
	friend: Pet;
	isBlocked: boolean;
	isDeleted: boolean;
	createdAt: Date;
	blockedAt: Date | null;
}