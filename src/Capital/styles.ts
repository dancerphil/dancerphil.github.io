import { css } from '@emotion/css';

export const containerCss = css`
    height: 100vh;
`;

export const leftPanelCss = css`
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
`;

export const rightPanelCss = css`
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
`;

export const chartCss = css`
    width: 100%;
    height: 100%;
`;

export const sortableItemCss = css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    cursor: grab;
    
    &:active {
        cursor: grabbing;
    }
    
    &.dragging {
        opacity: 0.5;
    }
`;

export const dragHandleCss = css`
    cursor: grab;
    color: #adb5bd;
    flex-shrink: 0;
    
    &:hover {
        color: #495057;
    }
    
    &:active {
        cursor: grabbing;
    }
`;

export const sectionCss = css`
    margin-bottom: 24px;
`;
