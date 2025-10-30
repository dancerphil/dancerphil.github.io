// vanilla 架构
import L from 'leaflet';
import '@/styles';
import 'leaflet/dist/leaflet.css';
import {bindTyphoonLayer} from './bindTyphoonLayer';
import './index.css';

const mapDiv = document.createElement('div');
mapDiv.id = 'map';
document.body.appendChild(mapDiv);

const map = L.map('map').setView([39.9042, 116.4074], 9);

const bottomPane = map.createPane('bottom');
const opacityPane = map.createPane('opacity');
const markerPane = map.createPane('marker');
bottomPane.style.zIndex = '200';
opacityPane.style.zIndex = '300';
opacityPane.style.opacity = '0.5';
markerPane.style.zIndex = '400';

// 创建切换按钮
const toggleButton = document.createElement('button');
toggleButton.className = 'layer-toggle-btn';
toggleButton.textContent = '3D 可视化图层';
document.body.appendChild(toggleButton);

// 创建图层信息面板
const layerInfo = document.createElement('div');
layerInfo.className = 'layer-info';
layerInfo.innerHTML = `
    <div class="layer-info-item">
        <div class="layer-color" style="background: #e74c3c;"></div>
        <span class="layer-name">Marker Pane</span>
        <span class="layer-z-index">z-index: 400</span>
    </div>
    <div class="layer-info-item">
        <div class="layer-color" style="background: #3498db;"></div>
        <span class="layer-name">Opacity Pane</span>
        <span class="layer-z-index">z-index: 300</span>
    </div>
    <div class="layer-info-item">
        <div class="layer-color" style="background: #2ecc71;"></div>
        <span class="layer-name">Bottom Pane</span>
        <span class="layer-z-index">z-index: 200</span>
    </div>
`;
document.body.appendChild(layerInfo);

// 切换3D视图
let is3D = false;
toggleButton.addEventListener('click', () => {
    is3D = !is3D;
    const mapContainer = document.getElementById('map');

    if (is3D) {
        mapContainer?.classList.add('visualize-3d');
        toggleButton.textContent = '返回 2D 视图';
        layerInfo.classList.add('show');
        // 禁用地图交互
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
    }
    else {
        mapContainer?.classList.remove('visualize-3d');
        toggleButton.textContent = '3D 可视化图层';
        layerInfo.classList.remove('show');
        // 重新启用地图交互
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
    }
});

const layerTerrain = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri',
    maxZoom: 19,
    pane: 'bottom',
});

const layerStreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
    pane: 'opacity',
});

const typhoonLayer = L.layerGroup();

bindTyphoonLayer({layer: typhoonLayer, pane: 'marker'});

layerTerrain.addTo(map);
layerStreet.addTo(map);
typhoonLayer.addTo(map);

// 调整地图视图以显示所有点
// const bounds = L.latLngBounds(pathCoordinates.concat(forecastCoordinates));
// map.fitBounds(bounds, {padding: [50, 50]});
