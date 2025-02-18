export const loggerAdminMiddleware = (c: { req: { method: any; url: any; }; }, next: () => any) => {
    console.log(`Received ${c.req.method} request for ${c.req.url}`);
    return next();
};