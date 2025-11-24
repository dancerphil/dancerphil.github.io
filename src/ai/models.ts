import { createDeepSeek } from '@ai-sdk/deepseek';

const deepseekProvider = createDeepSeek({
    apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
});

export const deepseek = deepseekProvider('deepseek-chat');
