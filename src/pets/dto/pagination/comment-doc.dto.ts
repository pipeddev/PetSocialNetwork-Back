export const CommentPaginationDoc = {
	EACH_COMMENT: { name: 'eachComment', required: false, type: Number, description: 'Cantidad de comentarios por página' },
	ORDER_COMMENT: { name: 'orderComment', required: false, enum: ['asc', 'desc'], description: 'Orden de los resultados (asc o desc)' },
	EACH_REPLY: { name: 'eachReply', required: false, type: Number, description: 'Cantidad de respuestas por página' },
	ORDER_REPLY: { name: 'orderReply', required: false, enum: ['asc', 'desc'], description: 'Orden de los resultados (asc o desc)' }
};
