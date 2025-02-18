// drizzle.config.ts
// import { Config } from "drizzle-kit";
// import dotenv from "dotenv";
//
// dotenv.config(); // 加载环境变量
//
// 打印 DATABASE_URL 环境变量的值以进行调试
// console.log("测试路径-DATABASE_URL:", process.env.DATABASE_URL);
//
// export default {
//     dialect: 'sqlite', // 'mysql' | 'sqlite' | 'turso'
//     schema: './src/db/schema',
//     out: "./drizzle",
//     driver:'d1-http',
//     dbCredentials: {
//         // database: process.env.DATABASE_NAME as string,
//         // url: process.env.DATABASE_URL as string, // 或者 ":memory:" 表示内存数据库
//         // token: process.env.DATABASE_AUTH_TOKEN as string,
//         token: '-sq_deE6EBjQgy4vxOAop82qaIExw2ZZ64syJBs_',
//         databaseId: process.env.DATABASE_ID as string,
//         accountId: process.env.AccountId as string,
//     }
// } satisfies Config;

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle', // SQL 的输出路径
    schema: './src/db/schema', // schema 的位置
    dialect: 'sqlite', // 正如我们上文所说，D1 是基于 SQLite 的
});
