// src/admin/api_routes/systemRoute.ts
import { Hono } from 'hono';
import { detailItem, updateItem} from "@/admin/api_logic/systemApiLogic";

const app = new Hono();

//详情
app.get('/detail', async (c) => {
    const result = await detailItem(c);
    return c.json(result);
});
//更新
app.post('/update', async (c) => {
    const result = await updateItem(c);
    return c.json(result);
});

export default app;