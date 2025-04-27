export class CommentResponse {
	id: string;
	content: string;
	parentCommentId: string | null;
	postId: string;
	petId: string;
	createdAt: Date;
	updatedAt: Date;
	replies?: CommentResponse[];
}