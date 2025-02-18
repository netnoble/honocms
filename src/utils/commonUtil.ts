import {md5, sha1} from "hono/utils/crypto";
import {nanoid} from "nanoid";


//获取密码
export async function getPassword(password: string,salt:string) {
    return await md5(await sha1(password + salt));
}

//将无限数据转成tree结构
export function listToTree(data: any[], parentId: number = 0): any[] {
    const result: any[] = [];
    // 使用 Map 来提高查找速度
    const map = new Map<number, any>();
    data.forEach(item => map.set(item.id, item));

    data.forEach(item => {
        // 确保属性名与数据中的键匹配
        if (item.parent_id === parentId) {
            const children = listToTree(Array.from(map.values()), item.id);
            if (children.length > 0) {
                item.children = children;
            }
            result.push(item);
        }
    });
    return result;
}

export function getNanoid() {
    return nanoid();
}

//获取文件的后缀名
//生成文件名
export function getYearMonthDay() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}
