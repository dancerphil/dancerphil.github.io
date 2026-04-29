import { useEffect, useState } from 'react';
import { useGameStore } from './store';
import styles from './Event.module.css';

export const Event = () => {
    const currentEvent = useGameStore(s => s.currentEvent);
    const eventStartMs = useGameStore(s => s.eventStartMs);
    const eventQueue = useGameStore(s => s.eventQueue);
    const resolveEvent = useGameStore(s => s.resolveEvent);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/set-state-in-effect
        setProgress(0);
    }, [currentEvent]);

    useEffect(() => {
        if (!currentEvent?.duration) return;

        const { duration } = currentEvent;
        const iv = setInterval(() => {
            const elapsed = Date.now() - eventStartMs;
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);
            if (pct >= 100) {
                clearInterval(iv);
                resolveEvent();
            }
        }, 50);

        return () => clearInterval(iv);
    }, [currentEvent, eventStartMs, resolveEvent]);

    if (!currentEvent) return null;

    return (
        <div className={styles.eventPanel}>
            <h2 className={styles.eventTitle}>{currentEvent.title}</h2>
            <p className={styles.eventDescription}>{currentEvent.description}</p>

            {currentEvent.duration !== undefined && (
                <div className={styles.eventProgressBar}>
                    <div
                        className={styles.eventProgressFill}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {currentEvent.choices && (
                <div className={styles.eventChoices}>
                    {currentEvent.choices.map(choice => (
                        <button
                            key={choice.action}
                            className={styles.eventChoiceBtn}
                            onClick={() => resolveEvent(choice.action)}
                        >
                            {choice.text}
                        </button>
                    ))}
                </div>
            )}

            {eventQueue.length > 0 && (
                <div className={styles.eventQueueHint}>
                    还有 {eventQueue.length} 个待处理事件
                </div>
            )}
        </div>
    );
};
