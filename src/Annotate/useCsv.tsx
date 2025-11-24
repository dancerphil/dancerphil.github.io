/**
 * @file useCsv.tsx
 * useCsv 提供了上传 csv 文件并解析为数据集的功能。
 * 如果你需要支持其他的文件格式，可以在此基础上进行扩展。
 */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { parse } from 'papaparse';

type AsyncFunction = (...args: any[]) => Promise<any>;

function useActionLoading<A extends AsyncFunction>(action: A): [A, boolean] {
    const [pendingMutex, setPendingMutex] = useState(0);
    const actionWithLoading = useCallback(
        (...args: Parameters<A>) => {
            setPendingMutex(v => v + 1);
            const pending = action(...args);
            pending.finally(() => setPendingMutex(v => v - 1));
            return pending;
        },
        [action],
    );
    return [actionWithLoading as A, Boolean(pendingMutex)];
}

const defaultCsv = `id,name,department,salary,join_date,email
1,张三,技术部,15000,2020-03-15,zhangsan@company.com
2,李四,市场部,12000,2019-07-22,lisi@company.com
3,王五,技术部,18000,2018-11-08,wangwu@company.com
4,赵六,人力资源,13000,2021-01-10,zhaoliu@company.com
5,钱七,技术部,16000,2020-09-03,qianqi@company.com
6,孙八,市场部,14000,2019-05-18,sunba@company.com
7,周九,财务部,13500,2021-06-25,zhoujiu@company.com
8,吴十,技术部,17000,2018-08-14,wushi@company.com`;

interface AbstractData {
    _index: number;
    [key: string]: unknown;
}

const parseCSV = async (csvText: string): Promise<AbstractData[]> => {
    return new Promise((resolve, reject) => {
        parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                const dataset: AbstractData[] = results.data.map((item: any, _index) => ({ _index, ...item }));
                resolve(dataset);
            },
            error: (error: any) => {
                reject(error);
            },
        });
    });
};

export const useCsv = () => {
    const [dataset, setDataset] = useState<AbstractData[]>([]);

    useEffect(
        () => {
            parseCSV(defaultCsv).then(setDataset);
        },
        [],
    );

    const [onFileChange, loading] = useActionLoading(
        (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
            return new Promise((resolve) => {
                const file = event.target.files[0];
                if (file) {
                    setDataset([]);
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        const dataset = await parseCSV(e.target.result as string);
                        setDataset(dataset);
                        resolve();
                    };
                    reader.readAsText(file);
                }
            });
        },
    );

    return {
        onFileChange,
        loading,
        dataset,
        setDataset,
    };
};
