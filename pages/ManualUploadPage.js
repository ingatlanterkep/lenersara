'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '../forms/PostForm';
import ImageUploader from '../forms/ImageUploader';
import VerificationForm from '../forms/VerificationForm';
import { getCurrentUser } from '../services/usersService';
import { createPost, uploadImages, updatePost, getUserPosts } from '../services/apiService';
import { sendVerificationCode, verifyVerificationCode } from '../services/authService';
import { geocodeAddress } from '../utils/geocodeAddress';
import '../styles/UploadPage.css';
import '../styles/layout/DashboardLayout.css';
import '../styles/components/FieldsetCard.css';
import '../styles/components/Input.css';
import '../styles/components/Button.css';
import '../styles/components/Message.css';
import '../styles/components/InfoGrid.css';

const ManualUploadPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [imageUploadError, setImageUploadError] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [tempFiles, setTempFiles] = useState([]);
  const [tempUrls, setTempUrls] = useState([]);
  const [rentData, setRentData] = useState({ deposit: null });
  const [provider, setProvider] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [subscriptionType, setSubscriptionType] = useState('free');
  const [postCount, setPostCount] = useState(0);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const postFormRef = useRef();

  const getMaxPosts = () => {
    switch (subscriptionType) {
      case 'free': return 1;
      case 'optimum': return 5;
      case 'premium': return 10;
      default: return 1;
    }
  };

  const maxPosts = getMaxPosts();
  const isLimitReached = postCount >= maxPosts;
  const canUploadImages = subscriptionType !== 'free';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        const providerName = userData.companyDetails?.name || userData.email.split('@')[0];
        setProvider(providerName);
        setUserId(userData._id);
        setEmail(userData.email || '');
        setIsVerified(userData.verified || false);
        setSubscriptionType(userData.subscriptionType || 'free');

        const postsResp = await getUserPosts(userData._id, { page: 1, limit: 100 });
        setPostCount(postsResp.total ?? postsResp.data?.length ?? 0);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 403) {
          setMessage('A munkamenet lejárt. Átirányítunk a bejelentkezéshez...');
          setTimeout(() => router.push('/login'), 2000);
        } else {
          setMessage('Nem sikerült betölteni a felhasználói adatokat.');
        }
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchUserData();
  }, [router]);

  const handleFilesSelected = (items) => {
    const files = items.filter(item => item instanceof File);
    const urls = items.filter(item => typeof item === 'string');
    setTempFiles(prev => [...prev, ...files]);
    setTempUrls(prev => [...prev, ...urls]);
  };

  const handleRemoveImage = (index, isFile) => {
    if (isFile) {
      setTempFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      setTempUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleCreatePost = async () => {
    if (!isVerified) return setMessage('Előbb verifikáld az email címed!');
    if (isLimitReached) return setMessage('Elérted a hirdetési limitet. Válts csomagot!');
    if (!postFormRef.current?.validateForm()) return setMessage('Töltsd ki az összes kötelező mezőt!');

    const formData = postFormRef.current.getFormData();

    let geolocationForBackend = {
      lat: formData.geolocation?.lat ?? null,
      lon: formData.geolocation?.lon ?? null,
      radius: formData.geolocation?.radius ?? null,
      street_line: formData.geolocation?.street_line ?? [],
      area_polygon: formData.geolocation?.area_polygon ?? [],
    };

    const hasManualGeolocation = 
      geolocationForBackend.lat != null && 
      geolocationForBackend.lon != null;

    if (!hasManualGeolocation) {
      try {
        const addressForGeocode = {
          house_number: formData.address?.house_number || '',
          street: formData.address?.street || '',
          city: formData.address?.city || '',
          district: formData.address?.district || '',
          region: formData.address?.region || '',
          postal_code: formData.address?.postal_code || '',
          county: formData.address?.county || '',
          country: 'Magyarország',
        };

        const geocoded = await geocodeAddress(addressForGeocode);

        geolocationForBackend = {
          lat: geocoded.lat ?? null,
          lon: geocoded.lon ?? null,
          radius: geocoded.radius ?? null,
          street_line: geocoded.street_line ?? [],
          area_polygon: geocoded.area_polygon ?? [],
        };
      } catch (geocodeErr) {
        console.warn('Cím geokódolás fallback sikertelen', geocodeErr);
      }
    }

    const addressForBackend = {
      house_number: formData.address?.house_number || '',
      street: formData.address?.street || 'Nincs megadva',
      region: formData.address?.region || '',
      city: formData.address?.city || '',
      district: formData.address?.district || '',
      postal_code: formData.address?.postal_code || '',
      county: formData.address?.county || '',
      country: 'Magyarország',
    };

    const postData = {
      userId,
      provider: provider || 'Manual',
      listing_type: formData.listing_type || '',
      title: formData.title || '',
      description: formData.description || '',
      ...(formData.listing_type === 'eladó' ? { price: parseFloat(formData.price) || null } : {}),
      ...(formData.listing_type === 'kiadó' ? { 
        rental_price: parseFloat(formData.rental_price) || null,
        kaucio: parseFloat(formData.kaucio) || 0 
      } : {}),
      currency: formData.currency || 'HUF',
      common_charges: parseFloat(formData.common_charges) || 0,
      address: addressForBackend,
      geolocation: geolocationForBackend,
      type: propertyType || '',
      area: parseFloat(formData.area) || null,
      land_area: parseFloat(formData.land_area) || null,
      rooms: parseInt(formData.rooms) || 0,
      half_rooms: parseInt(formData.half_rooms) || 0,
      bathrooms_count: parseInt(formData.bathrooms_count) || 0,
      floor: formData.floor || '',
      total_floors: parseInt(formData.total_floors) || null,
      year_built: parseInt(formData.year_built) || null,
      internal_condition: formData.internal_condition || '',
      external_condition: formData.external_condition || '',
      building_material: formData.building_material || '',
      furnished: formData.furnished || '',
      air_conditioning: formData.air_conditioning || '',
      heating_type: formData.heating_type || '',
      energy_class: formData.energy_class || '',
      monthly_utility_cost: parseFloat(formData.monthly_utility_cost) || 0,
      comfort_level: formData.comfort_level || '',
      bathroom_type: formData.bathroom_type || '',
      view: formData.view || '',
      orientation: formData.orientation || '',
      parking_type: formData.parking_type || '',
      lift: formData.lift || '',
      new_build: formData.new_build || false,
      csok_eligible: formData.csok_eligible || false,
      hasBalcony: formData.hasBalcony || false,
      hasTerrace: formData.hasTerrace || false,
      hasGarage: formData.hasGarage || false,
      hasAirConditioning: formData.hasAirConditioning || false,
      hasLift: formData.hasLift || false,
      hasEnergyCertificate: formData.hasEnergyCertificate || false,
      parquetFloor: formData.parquetFloor || false,
      americanKitchen: formData.americanKitchen || false,
      hasSauna: formData.hasSauna || false,
      hasFireplace: formData.hasFireplace || false,
      gardenAccess: formData.gardenAccess || false,
      hasLivingRoom: formData.hasLivingRoom || false,
      separateRooms: formData.separateRooms || false,
      multipleWc: formData.multipleWc || false,
      insulatedBuilding: formData.insulatedBuilding || false,
      newWindows: formData.newWindows || false,
      quietArea: formData.quietArea || false,
      utilities: formData.utilities || {},
      links: formData.links || { original_listing: '' },
      agent: formData.agent || { name: '', email: '', phone: '' },
      source: 'manual',
      status: 'aktív',
      updated_at: new Date(),
    };

    try {
      const createdPost = await createPost(postData);
      if (!createdPost?.data?._id) throw new Error('Hirdetés létrehozása sikertelen');

      if ((tempFiles.length > 0 || tempUrls.length > 0) && canUploadImages) {
        let imageObjects = [];

        tempUrls.forEach((url, index) => {
          imageObjects.push({
            url,
            order_num: index,
            is_main: index === 0 && tempFiles.length === 0,
            watermark: false,
            is_floorplan: false
          });
        });

        if (tempFiles.length > 0) {
          const formDataImages = new FormData();
          tempFiles.forEach(file => formDataImages.append('images', file));

          try {
            const uploadRes = await uploadImages(formDataImages, createdPost.data._id);
            
            if (uploadRes?.filePaths?.length > 0) {
              uploadRes.filePaths.forEach((url, index) => {
                const globalIndex = tempUrls.length + index;
                imageObjects.push({
                  url,
                  order_num: globalIndex,
                  is_main: globalIndex === 0,
                  watermark: false,
                  is_floorplan: false
                });
              });
            }
          } catch (uploadErr) {
            console.error('Képfeltöltési hiba:', uploadErr);
            setMessage('Képek feltöltése sikertelen, de a hirdetés létrejött.');
          }
        }

        if (imageObjects.length > 0) {
          await updatePost(createdPost.data._id, { images: imageObjects });
        }
      }

      setMessage('Hirdetés sikeresen létrehozva!');
      postFormRef.current.resetForm();
      setTempFiles([]);
      setTempUrls([]);
      setPropertyType('');
      setRentData({ deposit: null });
      setPostCount(prev => prev + 1);
    } catch (err) {
      console.error(err);
      setMessage('Hiba történt a feltöltés során.');
    }
  };

  const handleSendVerificationCode = async () => {
    try {
      const res = await sendVerificationCode(email);
      if (res.success) {
        setShowVerification(true);
        setMessage('Kód elküldve az emailedre!');
      } else {
        setMessage(res.message || 'Hiba a kód küldésekor');
      }
    } catch (err) {
      setMessage('Hiba történt a kód kérésekor');
    }
  };

  const handleVerifyCode = async (code) => {
    try {
      const res = await verifyVerificationCode(email, code);
      if (res.success) {
        setIsVerified(true);
        setShowVerification(false);
        setMessage('Email sikeresen verifikálva! Most már feltölthetsz.');
      } else {
        setMessage('Hibás kód');
      }
    } catch (err) {
      setMessage('Hiba a verifikáció során');
    }
  };

  if (loadingPosts) return <div className="loading">Betöltés...</div>;

  return (
    <div className="upload-card">
      <h2>Hirdetésfeltöltés</h2>

      {!isVerified ? (
        <fieldset className="upload-fieldset">
          <legend>Email verifikáció szükséges</legend>
          <div className="fieldset-content">
            <p>Ahhoz, hogy hirdetést tudj feladni, előbb igazolnod kell az email cídedet.</p>
            {!showVerification ? (
              <div className="button-group">
                <button onClick={handleSendVerificationCode} className="profile-button">
                  Kód kérése az emailre
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ margin: '1rem 0' }}>Kód megadása</h3>
                <VerificationForm email={email} onVerify={handleVerifyCode} />
              </>
            )}
            {message && (
              <div className={message.includes('sikeres') || message.includes('verifikálva') ? 'message success' : 'message error'}>
                {message}
              </div>
            )}
          </div>
        </fieldset>
      ) : isLimitReached ? (
        <fieldset className="upload-fieldset">
          <legend>Hirdetési limit elérve</legend>
          <div className="fieldset-content" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              Jelenlegi hirdetéseid: <strong>{postCount} / {maxPosts}</strong>
              <span className={`badge ${subscriptionType}`}>{subscriptionType === 'free' ? 'alap' : subscriptionType}</span>
            </p>
            <p>Válts magasabb csomagra további hirdetésekért!</p>
            <div className="button-group">
              <button className="profile-button" onClick={() => router.push('/profile/finance')}>
                Csomagváltás
              </button>
            </div>
          </div>
        </fieldset>
      ) : (
        <>
          <PostForm 
            ref={postFormRef} 
            rentData={rentData} 
            setRentData={setRentData} 
            propertyType={propertyType}
            setPropertyType={setPropertyType}
          />

          {canUploadImages && (
            <fieldset className="upload-fieldset">
              <legend>Képfeltöltés (max. 20 kép)</legend>
              <div className="fieldset-content">
                <ImageUploader onFilesSelected={handleFilesSelected} onError={setImageUploadError} />
              </div>
            </fieldset>
          )}

          {(tempFiles.length > 0 || tempUrls.length > 0) && (
            <fieldset className="upload-fieldset">
              <legend>Feltöltött képek ({tempFiles.length + tempUrls.length})</legend>
              <div className="fieldset-content">
                <div className="image-preview-container">
                  {tempFiles.map((file, i) => (
                    <div key={`file-${i}`} className="image-preview-item">
                      <img src={URL.createObjectURL(file)} alt="előnézet" className="image-preview" />
                      <button onClick={() => handleRemoveImage(i, true)} className="remove-button btn-danger">
                        Törlés
                      </button>
                    </div>
                  ))}
                  {tempUrls.map((url, i) => (
                    <div key={`url-${i}`} className="image-preview-item">
                      <img src={url} alt="előnézet" className="image-preview" />
                      <button onClick={() => handleRemoveImage(i, false)} className="remove-button btn-danger">
                        Törlés
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>
          )}

          <div className="button-group">
            <button onClick={handleCreatePost} className="profile-button">
              Hirdetés létrehozása
            </button>
          </div>

          {message && (
            <div className={message.includes('sikeres') ? 'message success' : 'message error'}>
              {message}
            </div>
          )}
          {imageUploadError && <div className="message error">{imageUploadError}</div>}

          <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>
              <strong>Hirdetések:</strong> {postCount} / {maxPosts}{' '}
              <span className={`badge ${subscriptionType}`}>
                {subscriptionType === 'free' ? 'alap' : subscriptionType}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ManualUploadPage;