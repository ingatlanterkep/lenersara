// src/components/MarkerWithPopup.js
import { Marker, Popup } from 'react-leaflet';
import { useRef } from 'react';

const MarkerWithPopup = ({ position, icon, title, content }) => {
  const openTimeout = useRef(null);
  const isHovered = useRef(false);

  return (
    <Marker
      position={position}
      icon={icon}
      zIndexOffset={500}
      interactive={true}
      eventHandlers={{
        mouseover: (e) => {
          clearTimeout(openTimeout.current);
          isHovered.current = true;
          openTimeout.current = setTimeout(() => {
            if (isHovered.current) {
              e.target.openPopup();
            }
          }, 500);
        },
        mouseout: (e) => {
          isHovered.current = false;
          clearTimeout(openTimeout.current);
          setTimeout(() => {
            const popup = e.target.getPopup();
            if (popup && popup.isOpen() && !isHovered.current) {
              e.target.closePopup();
            }
          }, 500);
        },
      }}
    >
      <Popup
        autoClose={false}
        closeOnClick={false}
        eventHandlers={{
          mouseover: () => {
            isHovered.current = true;
          },
          mouseout: (e) => {
            isHovered.current = false;
            setTimeout(() => {
              const marker = e.sourceTarget._marker;
              if (!isHovered.current) {
                marker.closePopup();
              }
            }, 500);
          },
        }}
      >
        <div className="custom-popup">
          <div className="popup-header">
            <div className="title-bar">
              <h3 className="popup-title">{title}</h3>
            </div>
          </div>
          <div className="popup-content">{content}</div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkerWithPopup;