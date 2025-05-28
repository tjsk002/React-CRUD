import { z } from 'zod'

export const boardSchema = z.object({
    title: z.string().min(1, {
        message: '제목을 입력해주세요.',
    }),
    content: z.string().min(1, {
        message: '내용을 입력해주세요.',
    }),
})

export type CreateBoardInfo = z.infer<typeof boardSchema>
