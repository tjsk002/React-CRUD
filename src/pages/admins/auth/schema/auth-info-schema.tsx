import { z } from 'zod'

const passwordSchema = z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .min(5, { message: '5~12자리여야 합니다.' })
    .max(12, { message: '5~12자리여야 합니다.' })

export const adminInfoSchema = z.object({
    adminId: z.number().optional(),
    username: z
        .string()
        .min(1, {
            message: '아이디을 입력해주세요.',
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
    password: passwordSchema,
    confirmPassword: passwordSchema,
})

export type AdminInfo = z.infer<typeof adminInfoSchema>
