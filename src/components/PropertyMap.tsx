import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Property } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (property: Property) => void;
  height?: string;
  zoom?: number;
  center?: [number, number];
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  height = '100%',
  zoom = 13,
  center = [35.78, 51.42]
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map once
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center as [number, number],
        zoom,
        zoomControl: false
      });

      // Add high quality tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      // Add custom zoom control in top-left
      L.control.zoom({ position: 'topleft' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    (Object.values(markersRef.current) as L.Marker[]).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (properties.length === 0) return;

    const bounds = L.latLngBounds([]);

    properties.forEach((prop) => {
      const lat = prop.coordinates.lat;
      const lng = prop.coordinates.lng;
      if (!lat || !lng) return;

      bounds.extend([lat, lng]);

      const isSelected = selectedPropertyId === prop.id;
      const pricePill = prop.dealType === 'buy'
        ? formatPrice(prop.price.totalPrice)
        : `رهن: ${formatPrice(prop.price.mortgage)}`;

      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-property-pin',
        html: `
          <div class="cursor-pointer transition-transform duration-200 hover:scale-110 ${
            isSelected ? 'scale-110 z-50 ring-4 ring-amber-500' : ''
          }">
            <div class="px-2.5 py-1 rounded-full text-[11px] font-black shadow-md flex items-center gap-1 border border-white whitespace-nowrap ${
              isSelected
                ? 'bg-amber-600 text-white'
                : prop.dealType === 'buy'
                ? 'bg-emerald-800 text-white'
                : 'bg-teal-700 text-white'
            }">
              <span>${pricePill}</span>
            </div>
            <div class="w-2 h-2 mx-auto rotate-45 -mt-1 ${
              isSelected ? 'bg-amber-600' : prop.dealType === 'buy' ? 'bg-emerald-800' : 'bg-teal-700'
            }"></div>
          </div>
        `,
        iconSize: [100, 32],
        iconAnchor: [50, 24]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup content with Persian design
      const popupHtml = `
        <div style="width: 240px; font-family: 'Vazirmatn', sans-serif;" class="p-2 text-right">
          <img src="${prop.images[0]}" alt="${prop.title}" style="width:100%; height:110px; object-fit:cover; border-radius:8px; margin-bottom:8px;" />
          <h4 style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:4px; line-height:1.4;">${prop.title}</h4>
          <p style="font-size:11px; color:#64748b; margin-bottom:6px;">📍 ${prop.neighborhood} - ${toPersianDigits(prop.area)} متر</p>
          <div style="font-size:12px; font-weight:800; color:#065f46; margin-bottom:8px;">
            ${pricePill}
          </div>
          <button id="map-popup-btn-${prop.id}" style="width:100%; background:#065f46; color:#ffffff; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; border:none; cursor:pointer;">
            مشاهده جزییات ملک
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        if (onSelectProperty) {
          onSelectProperty(prop);
        }
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`map-popup-btn-${prop.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectProperty) {
              onSelectProperty(prop);
            }
          };
        }
      });

      markersRef.current[prop.id] = marker;
    });

    // If properties exist and bounds valid, fit bounds
    if (bounds.isValid() && properties.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    } else if (properties.length === 1) {
      map.setView([properties[0].coordinates.lat, properties[0].coordinates.lng], 14);
    }
  }, [properties, selectedPropertyId]);

  // Center on selected property when changed
  useEffect(() => {
    if (selectedPropertyId && markersRef.current[selectedPropertyId] && mapInstanceRef.current) {
      const marker = markersRef.current[selectedPropertyId];
      mapInstanceRef.current.panTo(marker.getLatLng(), { animate: true });
      marker.openPopup();
    }
  }, [selectedPropertyId]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      <div 
        ref={mapContainerRef} 
        style={{ height, width: '100%' }}
        className="w-full h-full"
      />
      {/* Map helper overlay badge */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 text-[11px] font-bold text-slate-700 pointer-events-none z-20 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
        <span>{toPersianDigits(properties.length)} ملک روی نقشه فعال است</span>
      </div>
    </div>
  );
};
