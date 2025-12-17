import styled from '@emotion/styled';

const Container = styled.div`
    position: relative;
    color: #fff;
    text-align: center;
    background-color: #159957;
    background-image: linear-gradient(120deg, #155799, #159957);
    padding: 80px 100px;
`;

export const Header = () => {
    return (
        <Container>
            <h3>汉译世界学术名著丛书——商务印书馆</h3>
            <h1 className="font-size-50">逻辑哲学论</h1>
            <h2>〔奥〕维特根斯坦 著</h2>
            <h2>贺绍甲 译</h2>
        </Container>
    );
};
