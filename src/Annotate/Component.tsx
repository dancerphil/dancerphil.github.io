/**
 * @file Component.tsx
 * Component 提供对每一个数据项的显示和修改能力。
 * 对于不同的数据标注需求，你需要实现对应的 Component。
 */
import { Dispatch, SetStateAction, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

interface Data {
    id: number;
    name: string;
    department: string;
    salary: number;
    join_date: string;
    email: string;
}

interface Props {
    data: Data;
    setData: Dispatch<SetStateAction<Data>>;
}

export const Component = ({ data, setData }: Props) => {
    const [code, setCode] = useState(JSON.stringify(data, null, 4));
    return (
        <div style={{ border: '1px solid aliceblue', padding: 20 }}>
            <Editor
                value={code}
                onValueChange={(code) => {
                    setCode(code);
                    try {
                        setData(JSON.parse(code));
                    }
                    catch {
                        // do nothing
                    }
                }}
                highlight={code => highlight(code, languages.json, 'json')}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
            />
        </div>
    );
};
