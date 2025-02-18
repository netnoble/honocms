//设置公共的响应方法

// 公共响应方法
export async function sendResponse(code: number = 200, message: string, data: any = null) {
    return {
        code: code,
        message: message,
        data: data
    };
}

// 成功响应方法
export async function sendSuccessResponse(data: any = null, message: string = '成功') {
    return await sendResponse(200, message, data);
}

// 失败响应方法
export async function sendErrorResponse(code: number = 400, message: string = '失败', data: any = null) {
    return await sendResponse(code, message, data);
}

// 自定义响应方法
export async function sendCustomResponse(code: number, data: any = null, message: string = '') {
    return await sendResponse(code, message, data);
}
