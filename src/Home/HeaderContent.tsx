import { Title, Anchor } from '@mantine/core';

export const HeaderContent = () => {
    return (
        <>
            <Title
                style={{
                    position: 'relative',
                    fontSize: '50px',
                    fontWeight: 'bold',
                }}
            >
                张振衣
            </Title>
            <div
                style={{
                    position: 'relative',
                    marginTop: '20px',
                    marginBottom: '40px',
                }}
            >
                <Anchor
                    href="https://zhihu.com/people/dancerphil"
                    style={{
                        fontSize: '20px',
                        opacity: 0.7,
                        color: 'unset',
                        textDecoration: 'unset',
                    }}
                >
                    https://zhihu.com/people/dancerphil
                </Anchor>
            </div>
        </>
    );
};
