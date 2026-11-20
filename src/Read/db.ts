export interface Novel {
    id: number;
    name: string;
    text: string;
}

const DB_NAME = 'read';
const STORE_NAME = 'novels';

const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.addEventListener('upgradeneeded', () => {
        request.result.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    });
    request.addEventListener('success', () => resolve(request.result));
    request.addEventListener('error', () => reject(request.error));
});

const request = async <T = unknown>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest) => {
    const db = await dbPromise;
    return new Promise<T>((resolve, reject) => {
        const req = run(db.transaction(STORE_NAME, mode).objectStore(STORE_NAME));
        req.addEventListener('success', () => resolve(req.result));
        req.addEventListener('error', () => reject(req.error));
    });
};

export const listNovels = () => request<Novel[]>('readonly', store => store.getAll());

export const addNovel = (novel: Omit<Novel, 'id'>) => request<number>('readwrite', store => store.add(novel));

export const putNovel = (novel: Novel) => request('readwrite', store => store.put(novel));
