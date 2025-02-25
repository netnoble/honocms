// src/utils/themeUtil.ts

/**
 * 动态加载主题
 * @param theme 主题名称
 * @returns 返回加载的主题模块（包含 commonLayout 和 indexView）
 */
export const loadTheme = async (theme: string) => {
    try {
        // 动态导入主题模块
        // @ts-ignore
        const { indexView } =  import(/* @vite-ignore */ `@/web/view/${theme}/indexView.ts`);
        // @ts-ignore
        const { commonLayout } = import(/* @vite-ignore */ `@/web/view/${theme}/commonLayout.ts`);
        return {
            commonLayout: commonLayout,
            indexView: indexView,
        };
    } catch (error) {
        throw new Error(`Theme ${theme} not found:${error}`);
    }
};

/**
 * 获取当前主题（可以从配置或请求中获取）
 * @param env 环境变量或 KV 存储
 * @returns 返回当前主题名称
 */
export const getCurrentTheme = async (env?: any): Promise<string> => {
    // 如果 env 中有 KV 存储，优先从 KV 中获取主题
    if (env?.THEMES_KV) {
        const theme = await env.THEMES_KV.get('current_theme');
        if (theme) return theme;
    }

    // 如果 env 中有环境变量，从环境变量中获取主题
    if (env?.CURRENT_THEME) {
        return env.CURRENT_THEME;
    }

    // 默认主题
    return 'default';
};