import c from './Maze.module.css';

const CHARACTER_COUNT = 10_000;

const maze = Array.from({ length: CHARACTER_COUNT }, () => (Math.random() < 0.5 ? '╱' : '╲')).join('');

export const Maze = () => {
    return <p className={c.maze}>{maze}</p>;
};
