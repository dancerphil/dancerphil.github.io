import { Button, Popover, SegmentedControl, Slider, Stack, Text, useMantineColorScheme } from '@mantine/core';
import { settingsRegion } from './region';

export const ReadSettings = () => {
    const { fontSize, lineHeight, paragraphGap } = settingsRegion.useValue();
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    return (
        <Popover position="bottom-end" withArrow shadow="md">
            <Popover.Target>
                <Button variant="default">设置</Button>
            </Popover.Target>
            <Popover.Dropdown w={260}>
                <Stack>
                    <div>
                        <Text size="sm">主题</Text>
                        <SegmentedControl
                            fullWidth
                            value={colorScheme}
                            onChange={value => setColorScheme(value as 'light' | 'dark')}
                            data={[
                                { label: '亮色', value: 'light' },
                                { label: '暗色', value: 'dark' },
                            ]}
                        />
                    </div>
                    <div>
                        <Text size="sm">字号 {fontSize}px</Text>
                        <Slider
                            min={14}
                            max={32}
                            value={fontSize}
                            onChange={value => settingsRegion.set(settings => ({ ...settings, fontSize: value }))}
                        />
                    </div>
                    <div>
                        <Text size="sm">行间距 {lineHeight.toFixed(1)}</Text>
                        <Slider
                            min={1.2}
                            max={3}
                            step={0.1}
                            value={lineHeight}
                            onChange={value => settingsRegion.set(settings => ({ ...settings, lineHeight: value }))}
                        />
                    </div>
                    <div>
                        <Text size="sm">段落间距 {paragraphGap}px</Text>
                        <Slider
                            min={0}
                            max={32}
                            value={paragraphGap}
                            onChange={value => settingsRegion.set(settings => ({ ...settings, paragraphGap: value }))}
                        />
                    </div>
                </Stack>
            </Popover.Dropdown>
        </Popover>
    );
};
