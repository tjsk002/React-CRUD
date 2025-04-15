import { z } from 'zod'

export const userInfoSchema = z.object({
    userId: z.number().optional(),
    username: z
        .string()
        .min(1, {
            message: '아이디를 입력해주세요.',
        })
        .min(5, {
            message: '5~12자리여야 합니다.',
        })
        .max(12, {
            message: '5~12자리여야 합니다.',
        }),
    nickName: z
        .string()
        .min(1, {
            message: '닉네임을 입력해주세요.',
        })
        .min(5, {
            message: '5~12자리여야 합니다.',
        })
        .max(12, {
            message: '5~12자리여야 합니다.',
        }),
    gender: z.string().optional(),
    role: z.string(),
    password: z.string(),
    isActive: z.boolean().optional(),
    type: z.string({
        message: '유형을 선택해주세요.',
    }),
    description: z.string().optional(),
    createdAt: z.string().optional(),
    deletedAt: z.string().nullable().optional().readonly(),
})

export type UserInfo = z.infer<typeof userInfoSchema>
