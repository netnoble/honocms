
// 定义请求体的Zod模式
import {z} from "zod";

export const updateUserRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    age: z.number().min(0),
    age2: z.number().min(0),
});
export const updatePasswordRequest = z.object({
    name: z.string(),
    email: z.string().email(),
    age: z.number().min(0),
});
