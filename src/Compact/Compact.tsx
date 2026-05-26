import { useMemo, useState } from 'react';
import { Button, Textarea, Group, Switch, Title, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { compactHtml } from './compactHtml';
import c from './Compact.module.css';

const textareaStyles = {
    input: {
        fontFamily: '"JetBrains Mono", Monaco, monospace',
        fontSize: '12px',
    },
};

export const Compact = () => {
    const [input, setInput] = useState('');
    const [keepClass, setKeepClass] = useState(false);
    const [keepId, setKeepId] = useState(false);
    const [stripScripts, setStripScripts] = useState(true);

    const { output, error } = useMemo(() => {
        if (!input.trim()) {
            return { output: '', error: '' };
        }

        try {
            return {
                output: compactHtml(input, { keepClass, keepId, stripScripts }),
                error: '',
            };
        }
        catch (err) {
            return {
                output: '',
                error: err instanceof Error ? err.message : String(err),
            };
        }
    }, [input, keepClass, keepId, stripScripts]);

    const handleCopy = async () => {
        if (!output) {
            return;
        }
        try {
            await navigator.clipboard.writeText(output);
            notifications.show({
                message: '已复制到剪贴板',
                color: 'green',
            });
        }
        catch {
            notifications.show({
                message: '复制失败，请手动复制',
                color: 'red',
            });
        }
    };

    return (
        <>
            <Title order={2}>compact</Title>
            <Text c="dimmed" mb="md">
                粘贴原始 html（例如报表导出的内容），移除样式相关内容，只保留结构与文本值。
            </Text>

            <Group mb="md">
                <Switch
                    label="保留 class 属性"
                    size="sm"
                    checked={keepClass}
                    onChange={event => setKeepClass(event.currentTarget.checked)}
                />
                <Switch
                    label="保留 id 属性"
                    size="sm"
                    checked={keepId}
                    onChange={event => setKeepId(event.currentTarget.checked)}
                />
                <Switch
                    label="移除 script/style 标签"
                    size="sm"
                    checked={stripScripts}
                    onChange={event => setStripScripts(event.currentTarget.checked)}
                />
                <Button disabled={!output} onClick={handleCopy}>复制结果</Button>
            </Group>

            {error && (
                <Text c="red" mb="md">{error}</Text>
            )}

            <div>
                <Text fw={700} mb="xs">输入</Text>
                <Textarea
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    placeholder="粘贴 html 内容，支持带样式的报表"
                    mt={8}
                    styles={textareaStyles}
                    autosize
                    minRows={10}
                    maxRows={20}
                />
            </div>
            <div>
                <Text fw={700} mb="xs" mt="md">输出</Text>
                <Textarea
                    readOnly
                    value={output}
                    placeholder="转换后的纯结构 html"
                    mt={8}
                    styles={textareaStyles}
                    autosize
                    minRows={10}
                    maxRows={20}
                />
                <Text fw={700} mt="md" mb="xs">预览</Text>
                <div
                    className={c.preview}
                    dangerouslySetInnerHTML={{ __html: output }}
                />
            </div>
        </>
    );
};
