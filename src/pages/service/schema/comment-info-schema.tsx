import { z } from 'zod'

export const commentInfoSchema = z.object({
    targetDate: z.string().min(1, {
        message: '날짜를 선택해주세요.',
    }),
    content: z.string().min(1, {
        message: '댓글 내용을 작성해주세요.',
    }),
})
export type CommentInfo = z.infer<typeof commentInfoSchema>
