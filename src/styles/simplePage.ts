import { injectGlobal } from '@emotion/css';

injectGlobal`
    body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100vh;
        width: 80vw;
        margin: 0 auto;
    }
    
    h1 {
        margin-block-start: 2em;
    }
`;
