```
cdn资源

https://cdnjs.com/libraries/layui



1、推送前先执行，生成SQL
npx drizzle-kit generate

2、这个是本地
npx wrangler d1 migrations apply cms_db_one

3、这个是推送到云端
npx wrangler d1 migrations apply cms_db_one --remote



wrangler dev
wrangler deploy

查看版本 
npx wrangler --version
wrangler --version

npm install
npm run dev

npm run deploy

npm run build


```