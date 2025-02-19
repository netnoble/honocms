```
cdn jslib

https://cdnjs.com/libraries/layui

1、
git clone https://github.com/netnoble/honocms.git
cd honocms
copy wrngler_bak.toml => wrangler.toml


1. Execute before pushing, generate SQL
npx drizzle-kit generate

2. This is local
npx wrangler d1 migrations apply honocms_db

3. This is pushed to the remote end
npx wrangler d1 migrations apply honocms_db --remote



wrangler dev
wrangler deploy

View version 
npx wrangler --version
wrangler --version

npm install
npm run dev

npm run deploy

npm run build


```