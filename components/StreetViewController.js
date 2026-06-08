// StreetViewController.js - JAVÍTOTT VERZIÓ

useEffect(() => {
  if (!map) return;

  const container = map.getContainer();

  if (isStreetViewMode) {
    // NE állítsuk itt a kurzort! Ezt a MapController kezeli.
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    // container.style.cursor = 'crosshair';  ← TÖRÖLD EZT A SORT!

    // Információs panel (maradhat)
    const info = L.control({ position: 'topright' });
    info.onAdd = function() {
      const div = L.DomUtil.create('div', 'streetview-info');
      div.innerHTML = '<strong>Street View mód</strong><br>Kattints a térképre!';
      div.style.cssText = 'background: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);';
      return div;
    };
    info.addTo(map);
    setTimeout(() => {
      if (info && map.hasControl(info)) {
        map.removeControl(info);
      }
    }, 3000);
  } else {
    // Normál mód
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
    // container.style.cursor = 'grab';  ← Ezt is hagyd a MapController-re!
  }
    
    // Kattintáskezelő
    const handleClick = (e) => {
      console.log('[StreetViewController] CLICK - isStreetViewMode:', isStreetViewMode);
      
      if (isStreetViewMode) {
        // Street View módban: nyissuk meg a Street View-t
        const { lat, lng } = e.latlng;
        const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
        console.log('[StreetViewController] Opening Street View:', url);
        window.open(url, '_blank', 'noopener,noreferrer');
        
        // Automatikusan kapcsoljuk ki a Street View módot
        console.log('[StreetViewController] Auto-disabling Street View mode');
        setIsStreetViewMode(false);
      } else if (selectedPost) {
        // Normál módban: sidebar bezárása
        setSelectedPost(null);
      }
    };
    
    map.on('click', handleClick);
    
    // Cleanup
    return () => {
      console.log('[StreetViewController] CLEANUP');
      map.off('click', handleClick);
      
      // Mindig engedélyezzük vissza a térkép interakciókat
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      container.style.cursor = 'grab';
    };
  }, [map, isStreetViewMode, setIsStreetViewMode, selectedPost, setSelectedPost]); // 🔥 FONTOS: isStreetViewMode is a dependency!

  return null;


export default StreetViewController;