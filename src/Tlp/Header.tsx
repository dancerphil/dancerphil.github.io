import { Title } from '@mantine/core';

export const Header = () => {
    return (
        <div
            style={{
                position: 'relative',
                color: '#fff',
                textAlign: 'center',
                backgroundColor: '#159957',
                backgroundImage: 'linear-gradient(120deg, #155799, #159957)',
                padding: '80px 100px',
            }}
        >
            <h3>汉译世界学术名著丛书——商务印书馆</h3>
            <Title order={1} style={{ fontSize: '50px' }}>逻辑哲学论</Title>
            <h2>〔奥〕维特根斯坦 著</h2>
            <h2>贺绍甲 译</h2>
        </div>
    );
};
