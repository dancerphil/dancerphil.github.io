/* eslint-disable max-lines */
import { Divider } from 'antd';
import { css } from '@emotion/css';
import { ReactNode } from 'react';
import { ShaderHeader } from '@/components/ShaderHeader';
import { HeaderContent } from './HeaderContent';
import { ListItem } from './ListItem';

const mainCss = css`
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 0;
    
    a {
        color: #1e6bb8;
        text-decoration: none;
        
        :hover {
            text-decoration: underline;
        }
    }
`;

const textCenterCss = css`
    text-align: center;
`;

const titleCss = css`
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 500;
    color: #159957;
`;

interface TitleProps {
    children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
    return <div className={titleCss}>{children}</div>;
};

export const Home = () => {
    return (
        <>
            <ShaderHeader>
                <HeaderContent />
            </ShaderHeader>
            <div className={mainCss}>
                <Title>关于我</Title>
                <ListItem
                    href="https://github.com/dancerphil"
                    title="我的 github 主页"
                />

                <Divider />

                <Title>推荐</Title>
                <ListItem
                    href="https://tradingagents.zeabur.app/"
                    title="股票分析"
                    description="多智能体股票分析工作流"
                />
                <ListItem
                    href="./tlp"
                    title="《逻辑哲学论》"
                    description="维特根斯坦的哲学著作，包含了 AI 辅读"
                />
                <ListItem
                    href="https://github.com/regionjs/region"
                    title="region-react"
                    description="react 状态管理"
                />
                <ListItem
                    href="https://github.com/dancerphil/dancerphil.github.io"
                    title="dancerphil.github.io"
                    description="当前站点的源码"
                />

                <Divider />

                <Title>随手写的玩具</Title>
                <ListItem
                    href="./age"
                    title="age"
                    description="可以计算自己的年龄的工具，精确到 0.0000001"
                />
                <ListItem
                    href="./annotate"
                    title="annotate"
                    description="数据标记产品原型"
                />
                <ListItem
                    href="./async-await-cookbook"
                    title="async-await-cookbook"
                    description="async await 代码风格指南"
                />
                <ListItem
                    href="./coder"
                    title="coder"
                    description="基于 localStorage 的在线的编辑器（代码很老）"
                />
                <ListItem
                    href="./github-friends"
                    title="github 关系网"
                    description="用 echarts 关系图分析 github 关系，可以找朋友"
                />
                <ListItem
                    href="./mbti"
                    title="mbti"
                    description="一个mbti八维分析工具"
                />
                <ListItem
                    href="./mine"
                    title="扫雷"
                    description="适配手机端的扫雷游戏"
                />
                <ListItem
                    href="./skyline"
                    title="3d commit 记录"
                    description="用 three.js 画的提交历史天际线玩具，但现在运行不了"
                />
                <Divider />

                <Title>随手写的动画</Title>
                <ListItem
                    href="./10/once.html"
                    title="10 随机迷宫"
                />
                <ListItem
                    href="./b"
                    title="base64 背景图"
                />
                <ListItem
                    href="https://codepen.io/dancerphil/pen/POdeWy"
                    title="纯 css 动画：bees"
                />
                {/* <ListItem */}
                {/*    href="https://codepen.io/dissimulate/pen/eZxEBO" */}
                {/*    title="窗帘动画 from codepen" */}
                {/* /> */}
                <ListItem
                    href="./d"
                    title="任务管理"
                />
                <ListItem
                    href="https://codepen.io/dancerphil/pen/dRmLza"
                    title="自动旋转的画图工具"
                />
                <ListItem
                    href="./m"
                    title="material-design v0 颜色分析"
                />
                {/* <ListItem */}
                {/*    href="https://vincentgarreau.com/particles.js/" */}
                {/*    title="particles 动画" */}
                {/* /> */}
                {/* <ListItem */}
                {/*    href="https://seenjs.io/demo-2048.html" */}
                {/*    title="3d 2048 游戏" */}
                {/* /> */}
                <ListItem
                    href="./w"
                    title="纯 css 动画"
                />
                <Divider />
                <div className={textCenterCss}>
                    {'With Love. '}
                    <a target="_blank" href="https://github.com/dancerphil" rel="noreferrer">Dancerphil</a>
                </div>
            </div>
        </>
    );
};
