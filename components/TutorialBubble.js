import React from 'react';
import '../styles/TutorialBubble.css';

const TutorialBubble = ({ message, targetRef, onClose, placement = 'right', offsetX = 100, offsetY = 0 }) => {
  const bubbleRef = React.useRef(null);

  React.useEffect(() => {
    if (bubbleRef.current) {
      const bubbleRect = bubbleRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let bubbleTop, bubbleLeft; // Átneveztem 'top' és 'left' helyett

      // Dinamikus eltolás kis képernyőkön
      let adjustedOffsetX = offsetX;
      if (viewportWidth <= 480) {
        adjustedOffsetX = offsetX * 0.1 - 165; // Drasztikusan csökkentett eltolás (pl. 100 → -230)
      } else if (viewportWidth <= 768) {
        adjustedOffsetX = offsetX * 0.6 - 240; // Mérsékelt csökkentés (pl. 100 → -220)
      } else {
        adjustedOffsetX = offsetX - 280; // Nagy képernyőn eredeti logika (-180)
      }

      if (targetRef.current && typeof targetRef.current.getBoundingClientRect === 'function') {
        const targetRect = targetRef.current.getBoundingClientRect();

        switch (placement) {
          case 'right':
            bubbleTop = targetRect.top + scrollY + targetRect.height / 2 - bubbleRect.height / 2 + offsetY;
            bubbleLeft = targetRect.right + scrollX + adjustedOffsetX;
            bubbleLeft = Math.min(bubbleLeft, viewportWidth + scrollX - bubbleRect.width - 10);
            break;
          case 'left':
            bubbleTop = targetRect.top + scrollY + targetRect.height / 2 - bubbleRect.height / 2 + offsetY;
            bubbleLeft = targetRect.left + scrollX - bubbleRect.width - 100 + offsetX;
            bubbleLeft = Math.max(bubbleLeft, scrollX + 10);
            break;
          case 'top':
            bubbleTop = targetRect.top + scrollY - bubbleRect.height - 10 + offsetY;
            bubbleLeft = targetRect.left + scrollX + targetRect.width / 2 - bubbleRect.width / 2 + offsetX;
            bubbleTop = Math.max(bubbleTop, scrollY + 10);
            break;
          case 'bottom':
            bubbleTop = targetRect.bottom + scrollY + 10 + offsetY;
            bubbleLeft = targetRect.left + scrollX + targetRect.width / 2 - bubbleRect.width / 2 + offsetX;
            bubbleTop = Math.min(bubbleTop, viewportHeight + scrollY - bubbleRect.height - 10);
            break;
          case 'center':
            bubbleTop = (viewportHeight - bubbleRect.height) / 2 + scrollY + offsetY;
            bubbleLeft = (viewportWidth - bubbleRect.width) / 2 + scrollX + offsetX;
            break;
          default:
            bubbleTop = targetRect.top + scrollY - bubbleRect.height - 10 + offsetY;
            bubbleLeft = targetRect.left + scrollX + targetRect.width / 2 - bubbleRect.width / 2 + offsetX;
        }
      } else if (placement === 'center') {
        bubbleTop = (viewportHeight - bubbleRect.height) / 2 + scrollY + offsetY;
        bubbleLeft = (viewportWidth - bubbleRect.width) / 2 + scrollX + offsetX;
      } else {
        console.warn('TutorialBubble: Érvénytelen targetRef vagy placement', { targetRef, placement });
        return;
      }

      // Általános korlátok
      bubbleTop = Math.max(bubbleTop, scrollY + 10);
      bubbleTop = Math.min(bubbleTop, viewportHeight + scrollY - bubbleRect.height - 10);
      bubbleLeft = Math.max(bubbleLeft, scrollX + 10);
      bubbleLeft = Math.min(bubbleLeft, viewportWidth + scrollX - bubbleRect.width - 10);

      bubbleRef.current.style.top = `${bubbleTop}px`;
      bubbleRef.current.style.left = `${bubbleLeft}px`;
    }
  }, [targetRef, placement, offsetX, offsetY]);

  return (
    <div ref={bubbleRef} className={`tutorial-bubble ${placement}`}>
      <div className="bubble-content">
        <p>{message}</p>
        <button onClick={onClose} className="bubble-close">
          ×
        </button>
      </div>
      <div className="bubble-arrow"></div>
    </div>
  );
};

export default TutorialBubble;