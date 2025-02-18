import {decode, sign, verify} from "hono/jwt";
//参考资料：https://free-for-dev.com/docs/hono/helpers/jwt
// 定义一个密钥，用于签名和验证JWT
// 确保secretKey是一个安全的密钥，并且不会硬编码在代码中
const secretKey = "your_secret_key"; // 请确保使用一个安全的密钥

/**
 * 生成JWT token
 * @param payload - 要包含在token中的数据
 * @returns 生成的JWT token
 */
export async function generateToken(payload: Record<string, any>): Promise<string> {
    // return sign(payload, secretKey);
    return await sign(payload, secretKey);
}

/**
 * 解密JWT token
 * @param token - 要解密的JWT token
 * @returns 解密后的payload数据
 */

export function decodeToken(token: string): Record<string, any> {
    return decode(token) as Record<string, any>;
}

/**
 * 验证JWT token
 * @param token
 */
export function verifyToken(token: string): boolean {
    try {
        verify(token, secretKey);
        return true;
    } catch (error) {
        return false;
    }
}
