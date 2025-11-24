import { useState } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Streamdown } from 'streamdown';
import { Modal } from 'antd';
import { useShortKey } from 'use-short-key';
import App from './App?raw';
import useCsv from './useCsv?raw';
import Component from './Component?raw';
import md from './Annotate.md?raw';

const files = {
    '/App.tsx': App,
    '/useCsv.tsx': useCsv,
    '/Component.tsx': Component,
};

export const Annotate = () => {
    const [open, setOpen] = useState(false);
    useShortKey({
        metaKey: true,
        code: 'KeyK',
        keydown: () => {
            setOpen(open => !open);
        },
    });
    return (
        <>
            <Sandpack
                template="react-ts"
                files={files}
                customSetup={{
                    dependencies: {
                        'antd': 'latest',
                        'papaparse': 'latest',
                        'react-simple-code-editor': 'latest',
                        'prismjs': 'latest',
                    },
                }}
                options={{
                    editorHeight: '100vh',
                }}
            />
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
            >
                <Streamdown>{md}</Streamdown>
            </Modal>
        </>
    );
};
