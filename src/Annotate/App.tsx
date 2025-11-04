/**
 * @file App.tsx
 * App 是沙盒的入口，提供了整体布局和文件上传功能。
 * 如果你需要调整布局，比如把数据改为横向分布，你可以在这里进行修改。
 * 另外，你可以为沙盒添加 npm 依赖，按下 Command + K 打开命令面板进行配置（待开发）
 */
import {Dispatch, SetStateAction, useCallback, useRef} from 'react';
import {Button} from 'antd';
import {useCsv} from './useCsv';
import {Component} from './Component';

interface AbstractData {
    _index: number;
    [key: string]: unknown;
}

interface ComponentWrapperProps {
    data: AbstractData;
    setDataset: Dispatch<SetStateAction<AbstractData[]>>;
}

const ComponentWrapper = ({data, setDataset}: ComponentWrapperProps) => {
    const setData: Dispatch<SetStateAction<AbstractData>> = useCallback(
        (dataAction: SetStateAction<AbstractData>) => {
            const _index = data._index;
            setDataset((dataset: AbstractData[]) => {
                const nextData: AbstractData = typeof dataAction === 'function' ? dataAction(dataset[_index]) : dataAction;
                dataset[_index] = nextData;
                return [...dataset];
            });
        },
        [data._index, setDataset],
    );
    return <Component data={data as any} setData={setData as any} />;
};

const App = () => {
    const {onFileChange, loading, dataset, setDataset} = useCsv();
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div style={{padding: 20}}>
            <label>
                <Button
                    type="primary"
                    loading={loading}
                    onClick={handleButtonClick}
                >
                    上传 CSV
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={onFileChange}
                    style={{display: 'none'}}
                />
            </label>
            <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20}}>
                {dataset.map(item => (
                    <ComponentWrapper
                        key={item._index}
                        data={item}
                        setDataset={setDataset}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
