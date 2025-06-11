import { z } from 'zod'

export const myInfoSchema = z.object({
    nickName: z.string().min(1, {
        message: '닉네임을 입력해주세요.',
    }),
    isActive: z.boolean(),
    description: z.string(),
})

export type MyInfo = z.infer<typeof myInfoSchema>
