import {Sandpack} from '@codesandbox/sandpack-react';
import App from './App?raw';
import useCsv from './useCsv?raw';
import Component from './Component?raw';

const files = {
    '/App.tsx': App,
    '/useCsv.tsx': useCsv,
    '/Component.tsx': Component,
};

export const Annotate = () => {
    return (
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
    );
};
