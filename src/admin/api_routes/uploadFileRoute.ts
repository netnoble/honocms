// src/admin/api_logic/uploadFileRoute.ts
import { Hono } from 'hono';
import {uploadFileItem} from "@/admin/api_logic/uploadFileApiLogic";

const app = new Hono();


//更新
app.post('/upload', async (c) => {
    const result = await uploadFileItem(c);
    return c.json(result);
});

export default app;