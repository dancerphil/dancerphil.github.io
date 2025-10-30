import L, {LatLngExpression, LayerGroup} from 'leaflet';

interface PointData {
    lat: number;
    lng: number;
    windSpeed: number;
    time: string;
    pressure: number;
}

// 台风路径假数据（围绕北京的路径）
const typhoonData: PointData[] = [
    {lat: 37.5, lng: 120.0, windSpeed: 15, time: '10-27 08:00', pressure: 998},
    {lat: 37.8, lng: 119.0, windSpeed: 20, time: '10-27 14:00', pressure: 992},
    {lat: 38.2, lng: 118.2, windSpeed: 25, time: '10-27 20:00', pressure: 985},
    {lat: 38.6, lng: 117.5, windSpeed: 30, time: '10-28 02:00', pressure: 978},
    {lat: 39.0, lng: 116.8, windSpeed: 35, time: '10-28 08:00', pressure: 970},
    {lat: 39.4, lng: 116.3, windSpeed: 40, time: '10-28 14:00', pressure: 965},
    {lat: 39.9, lng: 116.4, windSpeed: 45, time: '10-28 20:00', pressure: 960},
    {lat: 40.3, lng: 116.6, windSpeed: 48, time: '10-29 02:00', pressure: 955},
    {lat: 40.8, lng: 117.0, windSpeed: 42, time: '10-29 08:00', pressure: 962},
    {lat: 41.3, lng: 117.5, windSpeed: 38, time: '10-29 14:00', pressure: 968},
    {lat: 41.8, lng: 118.2, windSpeed: 32, time: '10-29 20:00', pressure: 975},
    {lat: 42.3, lng: 119.0, windSpeed: 28, time: '10-30 02:00', pressure: 982},
];

// 根据风速返回颜色
function getColorByWindSpeed(speed: number) {
    if (speed < 17.2) return '#3498db';
    if (speed < 24.5) return '#2ecc71';
    if (speed < 32.7) return '#f39c12';
    if (speed < 41.5) return '#e67e22';
    if (speed < 51.0) return '#e74c3c';
    return '#c0392b';
}

// 根据风速返回等级
function getLevel(speed: number) {
    if (speed < 17.2) return '热带低压';
    if (speed < 24.5) return '热带风暴';
    if (speed < 32.7) return '强热带风暴';
    if (speed < 41.5) return '台风';
    if (speed < 51.0) return '强台风';
    return '超强台风';
}

interface Params {
    layer: LayerGroup;
    pane?: string;
}

export const bindTyphoonLayer = ({layer, pane}: Params): void => {
    // 绘制台风路径点
    typhoonData.forEach((point, index) => {
        const circle = L.circleMarker([point.lat, point.lng], {
            radius: 8,
            fillColor: getColorByWindSpeed(point.windSpeed),
            color: '#333',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
            pane,
        });

        // 添加弹窗
        const popupContent = `
            <div style="font-family: Arial; min-width: 180px;">
                <h3 style="margin: 0 0 10px 0; color: ${getColorByWindSpeed(point.windSpeed)}; font-size: 16px;">
                    ${getLevel(point.windSpeed)}
                </h3>
                <p style="margin: 5px 0; font-size: 13px;"><strong>时间：</strong>${point.time}</p>
                <p style="margin: 5px 0; font-size: 13px;"><strong>位置：</strong>${point.lat}°N, ${point.lng}°E</p>
                <p style="margin: 5px 0; font-size: 13px;"><strong>风速：</strong>${point.windSpeed} m/s</p>
                <p style="margin: 5px 0; font-size: 13px;"><strong>气压：</strong>${point.pressure} hPa</p>
            </div>
        `;
        circle.bindPopup(popupContent);
        circle.addTo(layer);

        // 添加时间标签（每隔一个点显示）
        if (index % 2 === 0) {
            const icon = L.divIcon({
                className: 'time-label',
                html: `<div style="background: white; padding: 2px 6px; border-radius: 3px; font-size: 11px; white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">${point.time}</div>`,
                iconSize: [60, 20],
                iconAnchor: [-15, 10],
            });
            const label = L.marker([point.lat, point.lng], {
                icon,
                pane,
            });
            label.addTo(layer);
        }
    });

    // 绘制历史路径线
    const pathCoordinates: LatLngExpression[] = typhoonData.map(point => [point.lat, point.lng]);
    const historyLine = L.polyline(pathCoordinates, {
        color: '#e74c3c',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 5',
        lineJoin: 'round',
        pane,
    });
    historyLine.addTo(layer);

    // 添加预测路径
    const forecastData = [
        {lat: 42.3, lng: 119.0},
        {lat: 42.8, lng: 119.8},
        {lat: 43.3, lng: 120.8},
        {lat: 43.8, lng: 121.8},
    ];

    // 添加预测路径点
    forecastData.forEach((point) => {
        const circle = L.circleMarker([point.lat, point.lng], {
            radius: 6,
            fillColor: '#95a5a6',
            color: '#333',
            weight: 2,
            opacity: 0.6,
            fillOpacity: 0.5,
            dashArray: '3, 3',
            pane,
        });
        circle.addTo(layer);
    });

    const forecastCoordinates: LatLngExpression[] = forecastData.map(point => [point.lat, point.lng]);
    const forecastLine = L.polyline(forecastCoordinates, {
        color: '#95a5a6',
        weight: 3,
        opacity: 0.6,
        dashArray: '10, 10',
        lineJoin: 'round',
        pane,
    });
    forecastLine.addTo(layer);

    // 添加当前位置标记
    const currentPos = typhoonData[typhoonData.length - 1];
    const icon = L.divIcon({
        className: 'current-position',
        html: '<div style="width: 20px; height: 20px; background: #e74c3c; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(231, 76, 60, 0.8);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
    const currentMarker = L.marker([currentPos.lat, currentPos.lng], {
        icon,
        pane,
    });
    currentMarker.addTo(layer);
};
