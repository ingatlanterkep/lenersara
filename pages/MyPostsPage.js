'use client';

import React, { useState, useEffect } from 'react';
import { getUserPosts, deletePost, updatePost } from '../services/apiService';
import { getCurrentUser } from '../services/usersService';
import PostEditForm from '../forms/PostEditForm';
import apiClient from '../services/apiClient';
import '../styles/MyPostsPage.css';

import { FaCog, FaTrash, FaEye, FaEdit, FaPowerOff, FaStar } from 'react-icons/fa';

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [totalPosts, setTotalPosts] = useState(0);
  const [editingPostId, setEditingPostId] = useState(null);
  const [addressFilter, setAddressFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isIndividual, setIsIndividual] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState([]);
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const maxPostsIndividual = 20;
  const maxNormalHighlightsIndividual = 3;
  const maxPremiumHighlightsIndividual = 1;
  const [normalHighlightCount, setNormalHighlightCount] = useState(0);
  const [premiumHighlightCount, setPremiumHighlightCount] = useState(0);

  const handleToggleStatus = async (postId, currentStatus) => {
    if (!window.confirm(`Biztosan ${currentStatus === 'inaktív' ? 'aktiválod' : 'deaktiválod'}?`)) return;
    try {
      const newStatus = currentStatus === 'inaktív' ? 'aktív' : 'inaktív';
      const res = await updatePost(postId, { status: newStatus });
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, ...res.data } : p));
      setFilteredPosts(prev => prev.map(p => p._id === postId ? { ...p, ...res.data } : p));
    } catch (err) {
      alert('Hiba a státusz váltásakor');
    }
  };

  const handleToggleHighlight = async (postId, targetType, isRemove = false) => {
    const payloadType = isRemove ? 'remove' : targetType;

    try {
      const res = await apiClient.post(`/posts/highlight/${postId}`, { type: payloadType });

      if (res.data.success) {
        setPosts(prev => prev.map(p =>
          p._id === postId
            ? { ...p, priorityLevel: res.data.priorityLevel || 5, highlightUntil: res.data.highlightUntil || null }
            : p
        ));
        setFilteredPosts(prev => prev.map(p =>
          p._id === postId
            ? { ...p, priorityLevel: res.data.priorityLevel || 5, highlightUntil: res.data.highlightUntil || null }
            : p
        ));

        if (user.accountType === 'company' && res.data.newCredits !== undefined) {
          setUser(prev => ({ ...prev, credits: res.data.newCredits }));
        }

        if (isIndividual && isPremiumUser) {
          setNormalHighlightCount(prev =>
            targetType === 'normal'
              ? (isRemove ? prev - 1 : prev + 1)
              : prev
          );
          setPremiumHighlightCount(prev =>
            targetType === 'premium'
              ? (isRemove ? prev - 1 : prev + 1)
              : prev
          );
        }

        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Hiba a kiemelés művelet során');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Biztosan törlöd?')) return;
    try {
      await deletePost(postId);
      setPosts(prev => prev.filter(p => p._id !== postId));
      setFilteredPosts(prev => prev.filter(p => p._id !== postId));
      setSelectedPostIds(prev => prev.filter(id => id !== postId));
    } catch (err) {
      alert('Hiba a törléskor');
    }
  };

  const handleBulkHighlight = async (enable) => {
    if (!selectedPostIds.length) return alert('Nincs kijelölve semmi');

    if (isIndividual && isPremiumUser) {
      const newHighlightsCount = enable ? selectedPostIds.length : 0;

      if (enable && normalHighlightCount + newHighlightsCount > maxNormalHighlightsIndividual) {
        alert(`Nem lehet többet kiemelni! Jelenleg ${normalHighlightCount} aktív sima kiemelésed van, maximum ${maxNormalHighlightsIndividual} lehet.`);
        return;
      }
    }

    const targetType = enable ? 'normal' : 'remove';

    try {
      const promises = selectedPostIds.map(async (id) => {
        const res = await apiClient.post(`/posts/highlight/${id}`, { type: targetType });
        return { id, data: res.data };
      });

      const results = await Promise.all(promises);

      setPosts(prev => prev.map(p => {
        const result = results.find(r => r.id === p._id);
        if (result && result.data.success) {
          return {
            ...p,
            priorityLevel: result.data.priorityLevel || 5,
            highlightUntil: result.data.highlightUntil || null,
          };
        }
        return p;
      }));

      setFilteredPosts(prev => prev.map(p => {
        const result = results.find(r => r.id === p._id);
        if (result && result.data.success) {
          return {
            ...p,
            priorityLevel: result.data.priorityLevel || 5,
            highlightUntil: result.data.highlightUntil || null,
          };
        }
        return p;
      }));

      if (results.length > 0 && results[0].data.newCredits !== undefined) {
        setUser(prev => ({ ...prev, credits: results[0].data.newCredits }));
      }

      if (isIndividual && isPremiumUser) {
        const normalCount = results.filter(r => r.data.success).reduce((acc, r) => {
          const post = posts.find(p => p._id === r.id);
          if (post && post.priorityLevel === 4 && (!post.highlightUntil || new Date(post.highlightUntil) > new Date())) {
            return acc + 1;
          }
          return acc;
        }, 0);

        const premiumCount = results.filter(r => r.data.success).reduce((acc, r) => {
          const post = posts.find(p => p._id === r.id);
          if (post && post.priorityLevel === 3 && (!post.highlightUntil || new Date(post.highlightUntil) > new Date())) {
            return acc + 1;
          }
          return acc;
        }, 0);

        setNormalHighlightCount(normalCount);
        setPremiumHighlightCount(premiumCount);
      }

      alert(enable 
        ? `Kiemelve (${selectedPostIds.length} db)` 
        : `Visszavonva (${selectedPostIds.length} db)`
      );
    } catch (err) {
      console.error('Tömeges kiemelés hiba:', err);
      alert('Tömeges művelet sikertelen');
    }
  };

  const handleBulkPremium = async (enable) => {
    if (!selectedPostIds.length) return alert('Nincs kijelölve semmi');

    if (isIndividual && isPremiumUser) {
      const newPremiumCount = enable ? selectedPostIds.length : 0;

      if (enable && premiumHighlightCount + newPremiumCount > maxPremiumHighlightsIndividual) {
        alert(`Nem lehet több arany kiemelést! Jelenleg ${premiumHighlightCount}, max 1 lehet.`);
        return;
      }
    }

    const targetType = enable ? 'premium' : 'remove';

    try {
      const promises = selectedPostIds.map(async (id) => {
        const res = await apiClient.post(`/posts/highlight/${id}`, { type: targetType });
        return { id, data: res.data };
      });

      const results = await Promise.all(promises);

      setPosts(prev => prev.map(p => {
        const result = results.find(r => r.id === p._id);
        if (result && result.data.success) {
          return {
            ...p,
            priorityLevel: result.data.priorityLevel || 5,
            highlightUntil: result.data.highlightUntil || null,
          };
        }
        return p;
      }));

      setFilteredPosts(prev => prev.map(p => {
        const result = results.find(r => r.id === p._id);
        if (result && result.data.success) {
          return {
            ...p,
            priorityLevel: result.data.priorityLevel || 5,
            highlightUntil: result.data.highlightUntil || null,
          };
        }
        return p;
      }));

      if (results.length > 0 && results[0].data.newCredits !== undefined) {
        setUser(prev => ({ ...prev, credits: results[0].data.newCredits }));
      }

      if (isIndividual && isPremiumUser) {
        const normalCount = results.filter(r => r.data.success).reduce((acc, r) => {
          const post = posts.find(p => p._id === r.id);
          if (post && post.priorityLevel === 4 && (!post.highlightUntil || new Date(post.highlightUntil) > new Date())) {
            return acc + 1;
          }
          return acc;
        }, 0);

        const premiumCount = results.filter(r => r.data.success).reduce((acc, r) => {
          const post = posts.find(p => p._id === r.id);
          if (post && post.priorityLevel === 3 && (!post.highlightUntil || new Date(post.highlightUntil) > new Date())) {
            return acc + 1;
          }
          return acc;
        }, 0);

        setNormalHighlightCount(normalCount);
        setPremiumHighlightCount(premiumCount);
      }

      alert(enable 
        ? `Aranyozva (${selectedPostIds.length} db)` 
        : `Arany visszavonva (${selectedPostIds.length} db)`
      );
    } catch (err) {
      console.error('Tömeges aranyozás hiba:', err);
      alert('Tömeges arany művelet sikertelen');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchFilter);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsIndividual(currentUser.accountType === 'individual');
        setIsPremiumUser(currentUser.subscriptionType === 'premium');
      } catch (err) {
        alert('Felhasználó betöltési hiba');
      }
    };
    fetchUser();
  }, []);

  const fetchUserPosts = async (page = 1) => {
    if (!user?._id) return;
    setLoading(true);

    try {
      const params = {
        page,
        limit: isIndividual ? 100 : postsPerPage,
      };

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      const res = await getUserPosts(user._id, params);

      setPosts(res.data || []);
      setFilteredPosts(res.data || []);
      setTotalPosts(res.total || 0);

      if (isIndividual && isPremiumUser) {
        const normalCount = res.data.filter(p => 
          p.priorityLevel === 4 && 
          (!p.highlightUntil || new Date(p.highlightUntil) > new Date())
        ).length;

        const premiumCount = res.data.filter(p => 
          p.priorityLevel === 3 && 
          (!p.highlightUntil || new Date(p.highlightUntil) > new Date())
        ).length;

        setNormalHighlightCount(normalCount);
        setPremiumHighlightCount(premiumCount);
      }

      if (isIndividual && res.total > maxPostsIndividual) {
        alert(`Figyelem! Jelenleg ${res.total} hirdetésed van, de egyéni fiókkal max ${maxPostsIndividual} engedélyezett.`);
      }
    } catch (err) {
      console.error('Hirdetések betöltési hiba:', err);
      alert('Hirdetések betöltési hiba');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchUserPosts(currentPage);
  }, [user, currentPage, debouncedSearch, isIndividual]);

  const openPostDetails = (postId) => {
    window.open(`/post/${postId}`, '_blank', 'noopener,noreferrer');
  };

  if (!user) return <div className="loading">Betöltés...</div>;

  const totalPages = Math.ceil(totalPosts / (isIndividual ? 100 : postsPerPage));

  return (
    <div className="upload-card">
      <h2>Hirdetéseim</h2>

      <div className="actions-bar">
        <div className={`buttons-row ${!isIndividual ? 'company-layout' : 'individual-layout'}`}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            {!isIndividual && (
              <>
                <input
                  type="text"
                  placeholder="Külső ID, ref. szám vagy ügynök név alapján..."
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  className="form-input"
                  style={{ flex: 1, minWidth: '240px' }}
                />

                <div className="credit-display">
                  Kreditek: <span style={{ color: (user?.credits ?? 0) > 0 ? '#2563eb' : '#dc2626', fontSize: '1.25rem' }}>
                    {user?.credits ?? 0}
                  </span>
                  <button 
                    style={{ marginLeft: '12px', fontSize: '0.9rem', padding: '4px 10px' }}
                    className="profiler-button btn-primary"
                    onClick={() => window.location.href = '/profile/finance'}
                  >
                    + Vásárlás
                  </button>
                </div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', padding: '12px 0', justifyContent: 'flex-start' }}>
            {isIndividual && (
              <button className="profiler-button btn-primary" onClick={() => window.location.href = '/profile/upload'}>
                Új hirdetés
              </button>
            )}
            {isIndividual && (
              <button
                className="profiler-button btn-secondary"
                onClick={() => handleBulkHighlight(false)}
                disabled={!selectedPostIds.length}
              >
                Sima visszavonás
              </button>
            )}
            {isIndividual && (
              <button
                className="profiler-button btn-danger"
                onClick={() => {
                  if (!selectedPostIds.length) return;
                  if (!window.confirm(`Biztosan törlöd a kijelölt ${selectedPostIds.length} hirdetést?`)) return;
                  selectedPostIds.forEach(id => handleDeletePost(id));
                }}
                disabled={!selectedPostIds.length}
              >
                Kijelöltek törlése
              </button>
            )}
            <button
              className="profiler-button btn-success"
              onClick={() => window.open('/?onlyMyPosts=1', '_blank', 'noopener,noreferrer')}
              title="Saját hirdetéseim térképen"
            >
              Megtekintés térképen
            </button>

            <button
              className="profiler-button btn-info"
              onClick={() => handleBulkHighlight(true)}
              disabled={
                !selectedPostIds.length ||
                (isIndividual && (!isPremiumUser || normalHighlightCount >= maxNormalHighlightsIndividual))
              }
            >
              Kiemelés (+1 hét)
            </button>

            <button
              className="profiler-button btn-warning"
              onClick={() => handleBulkPremium(true)}
              disabled={
                !selectedPostIds.length ||
                (isIndividual && (!isPremiumUser || premiumHighlightCount >= maxPremiumHighlightsIndividual))
              }
            >
              Aranyozás (+1 hét)
            </button>

            <button
              className="profiler-button btn-outline-secondary"
              onClick={() => {
                if (window.confirm('Biztosan törlöd a kijelölést?')) {
                  setSelectedPostIds([]);
                }
              }}
              disabled={!selectedPostIds.length}
            >
              Kijelölés törlése
            </button>
          </div>
        </div>
      </div>

      <div className="myposts-posts-grid">
        {loading ? (
          <div className="loading">Betöltés...</div>
        ) : filteredPosts.length === 0 ? (
          <p className="no-posts">Nincsenek hirdetéseid.</p>
        ) : (
          filteredPosts.map(post => {
            const isHighlighted = post.priorityLevel === 4;
            const isPremiumHighlighted = post.priorityLevel === 3;
            const isSelected = selectedPostIds.includes(post._id);
            const showSettings = openSettingsId === post._id;
            const isHighlightActive = post.highlightUntil && new Date(post.highlightUntil) > new Date();

            return (
              <div
                key={post._id}
                className={`myposts-post-card ${isSelected ? 'myposts-selected' : ''} ${isPremiumHighlighted ? 'myposts-premium' : isHighlighted ? 'myposts-highlighted' : ''}`}
                data-priority={post.priorityLevel}
                onClick={() => {
                  setSelectedPostIds(prev => 
                    prev.includes(post._id)
                      ? prev.filter(id => id !== post._id)
                      : [...prev, post._id]
                  );
                }}
                style={{ cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  className="myposts-post-checkbox"
                  checked={isSelected}
                  onChange={e => {
                    e.stopPropagation();
                    if (e.target.checked) {
                      setSelectedPostIds(prev => [...prev, post._id]);
                    } else {
                      setSelectedPostIds(prev => prev.filter(id => id !== post._id));
                    }
                  }}
                  onClick={e => e.stopPropagation()}
                />

                <div className="myposts-top-icons">
                  <button
                    className="myposts-view-btn"
                    onClick={() => openPostDetails(post._id)}
                    title="Részletek megtekintése"
                  >
                    <FaEye />
                  </button>

                  {isHighlightActive && (
                    <button
                      className={`myposts-autorenew-btn ${post.autoRenewHighlight ? 'active' : ''}`}
                      onClick={async (e) => {
                        e.stopPropagation();
                        const enabled = !post.autoRenewHighlight;

                        try {
                          const res = await apiClient.post(`/posts/autorenew/${post._id}`, {
                            enabled,
                            type: post.priorityLevel === 3 ? 'premium' : 'normal'
                          });

                          if (res.data.success) {
                            setPosts(prev => prev.map(p => 
                              p._id === post._id ? { ...p, autoRenewHighlight: enabled } : p
                            ));
                            setFilteredPosts(prev => prev.map(p => 
                              p._id === post._id ? { ...p, autoRenewHighlight: enabled } : p
                            ));

                            alert(enabled 
                              ? 'Automatikus meghosszabbítás bekapcsolva! Lejárat után +7 nap.' 
                              : 'Kikapcsolva – nem hosszabbít automatikusan.'
                            );
                          }
                        } catch (err) {
                          alert(err.response?.data?.message || 'Hiba az automatikus meghosszabbítás kapcsolgatásakor');
                        }
                      }}
                      title={post.autoRenewHighlight 
                        ? 'Automatikus meghosszabbítás aktív – kikapcsoláshoz kattints' 
                        : 'Automatikus meghosszabbítás – bekapcsoláshoz kattints'}
                      style={{ background: post.autoRenewHighlight ? '#28a745' : '#ffffff' }}
                    >
                      <FaStar />
                    </button>
                  )}

                  <button
                    className="myposts-settings-btn"
                    onClick={() => setOpenSettingsId(showSettings ? null : post._id)}
                    title="Beállítások"
                  >
                    <FaCog />
                  </button>
                </div>

                {showSettings && (
                  <div className="myposts-settings-menu">
                    <button onClick={() => { handleToggleStatus(post._id, post.status); setOpenSettingsId(null); }}>
                      <FaPowerOff /> {post.status === 'inaktív' ? 'Aktiválás' : 'Deaktiválás'}
                    </button>
                    <button
                      onClick={() => {
                        if (isIndividual && !isPremiumUser) {
                          alert('Ez a funkció csak Prémium előfizetéssel érhető el.');
                          setOpenSettingsId(null);
                          return;
                        }
                        if (isIndividual && isPremiumUser && normalHighlightCount >= maxNormalHighlightsIndividual && post.priorityLevel !== 4) {
                          alert(`Elérted a maximum 3 sima kiemelést!`);
                          setOpenSettingsId(null);
                          return;
                        }
                        const isCurrently = post.priorityLevel === 4;
                        handleToggleHighlight(post._id, 'normal', isCurrently);
                        setOpenSettingsId(null);
                      }}
                      disabled={isIndividual && !isPremiumUser}
                    >
                      <FaStar /> {post.priorityLevel === 4 ? 'Sima törlése' : 'Sima kiemelés'}
                    </button>
                    <button
                      onClick={() => {
                        if (isIndividual && !isPremiumUser) {
                          alert('Ez a funkció csak Prémium előfizetéssel érhető el.');
                          setOpenSettingsId(null);
                          return;
                        }
                        if (isIndividual && isPremiumUser && premiumHighlightCount >= maxPremiumHighlightsIndividual && post.priorityLevel !== 3) {
                          alert(`Elérted a maximum 1 arany kiemelést!`);
                          setOpenSettingsId(null);
                          return;
                        }
                        const isCurrently = post.priorityLevel === 3;
                        handleToggleHighlight(post._id, 'premium', isCurrently);
                        setOpenSettingsId(null);
                      }}
                      disabled={isIndividual && !isPremiumUser}
                      style={{ color: post.priorityLevel === 3 ? '#f59e0b' : '#d97706' }}
                    >
                      <FaStar style={{ color: '#f59e0b' }} /> {post.priorityLevel === 3 ? 'Arany törlése' : 'Arany kiemelés'}
                    </button>
                    <button className="danger" onClick={() => { handleDeletePost(post._id); setOpenSettingsId(null); }}>
                      <FaTrash /> Törlés
                    </button>
                  </div>
                )}

                <div className="myposts-image-container">
                  {post.images?.length > 0 ? (
                    <img
                      src={post.images[0].url}
                      alt={post.title}
                      className="myposts-post-main-image"
                      onError={e => (e.target.src = '/placeholder.jpg')}
                    />
                  ) : (
                    <div className="myposts-no-image">Nincs kép</div>
                  )}
                </div>

                <div className="myposts-card-content">
                  <h3 className="myposts-post-title">{post.title || 'Név nélküli hirdetés'}</h3>
                  <div className="myposts-post-external-id">
                    {post.source === 'ingatlanforras' 
                      ? `#${post.externalId || '—'}` 
                      : (post.reference_number 
                          ? `#${post.reference_number}` 
                          : post.agent?.name 
                            ? post.agent.name 
                            : '—')}
                  </div>
                  <div className="myposts-post-agent">
                    {post.agent?.name?.trim() || '—'}
                  </div>
                  {isHighlightActive && (
                    <div className="highlight-info">
                      Kiemelve: {new Date(post.highlightUntil).toLocaleDateString('hu-HU')}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {editingPostId && editingPostId !== 'new' && (
        <div className="edit-modal">
          <PostEditForm
            postId={editingPostId}
            postData={posts.find(p => p._id === editingPostId)}
            onSave={data => {
              setPosts(p => p.map(x => x._id === editingPostId ? { ...x, ...data } : x));
              setFilteredPosts(p => p.map(x => x._id === editingPostId ? { ...x, ...data } : x));
              setEditingPostId(null);
            }}
            onCancel={() => setEditingPostId(null)}
          />
        </div>
      )}

      {!isIndividual && totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Előző
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Következő
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;