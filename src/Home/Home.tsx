import { Divider } from '@mantine/core';
import { ShaderHeader } from '@/components/ShaderHeader';
import { HeaderContent } from './HeaderContent';
import { ListItem } from './ListItem';
import c from './Home.module.css';

export const Home = () => {
    return (
        <>
            <ShaderHeader>
                <HeaderContent />
            </ShaderHeader>
            <div className={c.main}>
                <div className={c.title}>关于我</div>
                <ListItem
                    href="https://github.com/dancerphil"
                    title="我的 github 主页"
                />

                <Divider my="lg" />

                <div className={c.title}>推荐</div>
                <ListItem
                    href="https://agents.dancerphil.com"
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

                <Divider my="lg" />

                <div className={c.title}>随手写的玩具</div>
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
                    href="./cash-flow"
                    title="现金流计算器"
                    description="计算一笔现金流资产值多少钱"
                />
                <ListItem
                    href="./capital"
                    title="资本视图"
                    description="用 echarts 桑基图可视化资产配置结构"
                />
                <ListItem
                    href="./color"
                    title="颜色计算器"
                    description="计算一个颜色在透明模式下的色值"
                />
                <ListItem
                    href="./compact"
                    title="compact"
                    description="移除样式、保留结构和值的 HTML 清理器"
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
                    href="./one-percent"
                    title="每天百分之一"
                    description="一个关于钱、时间和意义的增量游戏"
                />
                <Divider my="lg" />

                <div className={c.title}>随手写的动画</div>
                <ListItem
                    href="./maze"
                    title="随机迷宫"
                />
                <ListItem
                    href="./background"
                    title="base64 背景图"
                />
                <ListItem
                    href="https://codepen.io/dancerphil/pen/POdeWy"
                    title="纯 css 动画：bees"
                />
                <ListItem
                    href="https://codepen.io/dancerphil/pen/dRmLza"
                    title="自动旋转的画图工具"
                />
                <Divider my="lg" />
                <div style={{ textAlign: 'center' }}>
                    {'With Love. '}
                    <a target="_blank" href="https://github.com/dancerphil" rel="noreferrer">Dancerphil</a>
                </div>
            </div>
        </>
    );
};
