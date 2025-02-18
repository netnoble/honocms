import {Context} from "hono";
import {getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie,} from 'hono/cookie'


//获取管理员cookie
export async function getAdminCookie(c: Context) {
    return getCookie(c,'AdminCookie')
}

//获取管理员cookie
export async function setAdminCookie(c: Context,token:string) {
    return setCookie(c,'AdminCookie',token)
}

//设置管理员id
export async function setAdminId(c: Context,id:any) {
    return setCookie(c,'AdminId',id)
}

//获取管理员id
export async function getAdminId(c: Context) {
    return getCookie(c,'AdminId')
}

//删除所有cookie
export async function deleteAllCookie(c: Context) {
    deleteCookie(c,'AdminCookie')
    deleteCookie(c,'AdminId')
    return true
}


