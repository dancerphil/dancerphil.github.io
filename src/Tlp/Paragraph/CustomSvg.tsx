import { SVGProps } from 'react';
import c from './CustomSvg.module.css';

const Label = ({ children, ...props }: SVGProps<SVGTextElement>) => (
    <text className={c.label} {...props}>{children}</text>
);

const Edge = (props: SVGProps<SVGLineElement>) => (
    <line className={c.edge} {...props} />
);

const front = {
    a1: [50 - 10, 130 + 10],
    a2: [150 - 10, 130 + 10],
    a3: [150 - 10, 30 + 10],
    a4: [50 - 10, 30 + 10],
};
const back = {
    b1: [80, 100],
    b2: [180, 100],
    b3: [180, 0],
    b4: [80, 0],
};

export const CustomCube = () => {
    return (
        <svg style={{ width: '200px', height: '200px' }} viewBox="0 0 200 150">
            <Edge x1={front.a1[0]} y1={front.a1[1]} x2={front.a2[0]} y2={front.a2[1]} />
            <Edge x1={front.a2[0]} y1={front.a2[1]} x2={front.a3[0]} y2={front.a3[1]} />
            <Edge x1={front.a3[0]} y1={front.a3[1]} x2={front.a4[0]} y2={front.a4[1]} />
            <Edge x1={front.a4[0]} y1={front.a4[1]} x2={front.a1[0]} y2={front.a1[1]} />
            <Edge x1={back.b1[0]} y1={back.b1[1]} x2={back.b2[0]} y2={back.b2[1]} />
            <Edge x1={back.b2[0]} y1={back.b2[1]} x2={back.b3[0]} y2={back.b3[1]} />
            <Edge x1={back.b3[0]} y1={back.b3[1]} x2={back.b4[0]} y2={back.b4[1]} />
            <Edge x1={back.b4[0]} y1={back.b4[1]} x2={back.b1[0]} y2={back.b1[1]} />
            <Edge x1={front.a1[0]} y1={front.a1[1]} x2={back.b1[0]} y2={back.b1[1]} />
            <Edge x1={front.a2[0]} y1={front.a2[1]} x2={back.b2[0]} y2={back.b2[1]} />
            <Edge x1={front.a3[0]} y1={front.a3[1]} x2={back.b3[0]} y2={back.b3[1]} />
            <Edge x1={front.a4[0]} y1={front.a4[1]} x2={back.b4[0]} y2={back.b4[1]} />
            <Label x={front.a1[0] - 3} y={front.a1[1] + 12}>a</Label>
            <Label x={front.a2[0] - 3} y={front.a2[1] + 12}>a</Label>
            <Label x={front.a3[0] - 6} y={front.a3[1] - 5}>a</Label>
            <Label x={front.a4[0] - 6} y={front.a4[1] - 5}>a</Label>
            <Label x={back.b1[0] + 1} y={back.b1[1] + 12}>b</Label>
            <Label x={back.b2[0] + 1} y={back.b2[1] + 12}>b</Label>
            <Label x={back.b3[0] - 3} y={back.b3[1] - 5}>b</Label>
            <Label x={back.b4[0] - 3} y={back.b4[1] - 5}>b</Label>
        </svg>
    );
};

const centerX = 50;
const centerY = 50;
const radius = 4;

const controlPoint1X = 300;
const controlPoint1Y = -80;
const controlPoint2X = 300;
const controlPoint2Y = 180;

export const CustomSight = () => {
    return (
        <svg className={c.sightSvg} viewBox="0 0 300 100">
            <path
                className={c.curve}
                d={`M ${centerX} ${centerY}
                    C ${controlPoint1X} ${controlPoint1Y},
                    ${controlPoint2X} ${controlPoint2Y},
                    ${centerX} ${centerY}`}
            />
            <circle className={c.circle} cx={centerX} cy={centerY} r={radius} />
            <Label x={centerX - 50} y={centerY + 4}>{'眼睛 -'}</Label>
        </svg>
    );
};
