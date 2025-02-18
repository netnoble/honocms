
### 迁移执行的命令记录
```sqlite d1

数据库迁移：

通过 drizzle-kit generate 生成迁移文件。
本地应用迁移 wrangler d1 migrations apply test-db-1
远程应用迁移 wrangler d1 migrations apply test-db-1 --remote
本地文件可在 .wrangler/state/v3/d1 目录下找到，可使用 DataGrip 等工具进行连接
登陆完 wrangler 之后可以用命令行来创建 D1 数据库了，我们用这条指令可以创建一个名为 Test 的数据库：


pnpx wrangler d1 create Test



1、推送前先执行，生成SQL
npx drizzle-kit generate

2、这个可能是推送到本地的
好像
--  npx drizzle-kit push



3、这个是推送到云端
npx wrangler d1 migrations apply cms01 --remote
npx wrangler d1 migrations apply cms_db_one --remote

4、这个是本地
npx wrangler d1 migrations apply cms01
npx wrangler d1 migrations apply cms_db_one

```



