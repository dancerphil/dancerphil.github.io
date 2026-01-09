import { Button, Input, Space, Switch, Typography, message } from 'antd';
import { css } from '@emotion/css';
import { useMemo, useState } from 'react';
import { compactHtml } from './compactHtml';

const { TextArea } = Input;

const textareaCss = css`
    margin-top: 8px;
    width: 100%;
    min-height: 420px;
    font-family: 'JetBrains Mono', 'Monaco', monospace;
    font-size: 12px;
`;

const previewCss = css`
    margin-top: 12px;
    padding: 12px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    background: #ffffff;
    min-height: 200px;
    max-height: 520px;
    overflow: auto;
`;

const switchCss = css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;

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
            message.success('已复制到剪贴板');
        }
        catch {
            message.error('复制失败，请手动复制');
        }
    };

    return (
        <>
            <Typography.Title level={2}>compact</Typography.Title>
            <Typography.Paragraph type="secondary">
                粘贴原始 html（例如报表导出的内容），移除样式相关内容，只保留结构与文本值。
            </Typography.Paragraph>

            <Space size="middle" wrap>
                <span className={switchCss}>
                    <Switch size="small" checked={keepClass} onChange={setKeepClass} />
                    <span>保留 class 属性</span>
                </span>
                <span className={switchCss}>
                    <Switch size="small" checked={keepId} onChange={setKeepId} />
                    <span>保留 id 属性</span>
                </span>
                <span className={switchCss}>
                    <Switch size="small" checked={stripScripts} onChange={setStripScripts} />
                    <span>移除 script/style 标签</span>
                </span>
                <Button type="primary" disabled={!output} onClick={handleCopy}>复制结果</Button>
            </Space>

            {error && (
                <Typography.Text type="danger">{error}</Typography.Text>
            )}

            <div>
                <Typography.Text strong>输入</Typography.Text>
                <TextArea
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    placeholder="粘贴 html 内容，支持带样式的报表"
                    className={textareaCss}
                />
            </div>
            <div>
                <Typography.Text strong>输出</Typography.Text>
                <TextArea
                    readOnly
                    value={output}
                    placeholder="转换后的纯结构 html"
                    className={textareaCss}
                />
                <Typography.Text strong style={{ marginTop: 12, display: 'block' }}>预览</Typography.Text>
                <div
                    className={previewCss}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: output }}
                />
            </div>
        </>
    );
};
