import { useEffect, useRef } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Map component that renders the actual Google Map
function MapComponent({
  center,
  zoom,
  onMapLoad,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
  onMapLoad?: (map: google.maps.Map) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Add marker for the business location
      const marker = new window.google.maps.Marker({
        position: center,
        map,
        title: 'Tzolis Welding Services',
        animation: google.maps.Animation.DROP,
        icon: {
          url:
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#ea580c" stroke="#fff" stroke-width="2"/>
              <circle cx="20" cy="20" r="8" fill="#fff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20),
        },
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">
              Tzolis Welding Services
            </h3>
            <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">
              📍 123 Industrial Street, Athens, Greece
            </p>
            <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">
              📞 +30 210 123 4567
            </p>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              ✉️ info@tzoliswelding.gr
            </p>
          </div>
        `,
      });

      // Show info window on marker click
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Call the onMapLoad callback if provided
      if (onMapLoad) {
        onMapLoad(map);
      }
    }
  }, [center, zoom, onMapLoad]);

  return <div ref={ref} className="w-full h-full" />;
}

export default function ContactMap() {
  const { t } = useTranslation();

  // Coordinates for Athens, Greece (Industrial area example)
  const center = { lat: 38.8282, lng: 22.4426 };
  const zoom = 15;

  const handleMapLoad = () => {
    console.log('Map loaded successfully');
  };

  const render = (status: string) => {
    switch (status) {
      case 'LOADING':
        return (
          <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        );
      case 'FAILURE':
        return (
          <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center p-8">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v12h12V4H4z"
                    clipRule="evenodd"
                  />
                  <path d="M6 6h8v2H6V6zM6 10h8v2H6v-2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg font-medium mb-2">
                Unable to load map
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Please check your internet connection or try refreshing the page
              </p>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm text-gray-700 font-medium mb-1">
                  Our Location:
                </p>
                <p className="text-sm text-gray-600">123 Industrial Street</p>
                <p className="text-sm text-gray-600">Athens, Greece 10431</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <MapComponent center={center} zoom={zoom} onMapLoad={handleMapLoad} />
        );
    }
  };

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {t('contact.findUs') || 'Find Us'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Visit our workshop in the heart of Athens. We&apos;re easily
          accessible by car or public transport.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-96">
          <Wrapper
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
            render={render}
            libraries={['places']}
          />
        </div>

        {/* Map Info Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
              <p className="text-gray-600">123 Industrial Street</p>
              <p className="text-gray-600">Athens, Greece 10431</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-1">Directions</h4>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                Get Directions
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-gray-800 mb-1">Parking</h4>
              <p className="text-gray-600">Free parking available</p>
              <p className="text-gray-600">on-site for customers</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
