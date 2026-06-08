'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import {
  getUsers,
  deleteUser,
  getCurrentUser,
} from '../services/usersService';
import {
  getUserPosts,
  deletePost,
  updatePost,
  deleteAllUserPosts,
} from '../services/apiService';
import PostEditForm from '../forms/PostEditForm';
import ImageGallery from '../components/ImageGallery';
import MissingLocations from '../components/MissingLocations';
import '../styles/AdminLayout.css';
import '../styles/AdminPage.css';
import '../styles/layout/DashboardLayout.css';

// Next.js-ben nincs #root, használjuk a body-t
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [officePosts, setOfficePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);

  // Pagináció
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [usersTotalPages, setUsersTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentUser = await getCurrentUser();
        if (!currentUser.isAdmin) {
          setError('Admin jogosultság szükséges!');
          return;
        }
        setIsAdmin(true);

        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setUsersTotalPages(Math.ceil(fetchedUsers.length / usersPerPage));
      } catch (err) {
        setError(err.message || 'Hiba történt az adatok lekérésekor');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchData();
  }, []);

  useEffect(() => {
    const fetchOfficePosts = async () => {
      if (selectedOffice) {
        try {
          const postsResponse = await getUserPosts(selectedOffice._id, {
            page: currentPage,
            limit: postsPerPage,
          });
          setOfficePosts(postsResponse.data || []);
          setFilteredPosts(postsResponse.data || []);
          setTotalPosts(postsResponse.total || 0);
          setTotalPages(postsResponse.pages || 1);
        } catch (err) {
          console.error('Hiba az iroda posztjainak lekérésekor:', err);
          setOfficePosts([]);
          setFilteredPosts([]);
          setTotalPosts(0);
          setTotalPages(1);
        }
      }
    };

    fetchOfficePosts();
  }, [selectedOffice, currentPage, postsPerPage]);

  useEffect(() => {
    const postsToFilter = officePosts;
    setFilteredPosts(
      postsToFilter.filter((post) => {
        const addressMatch = `${post.address?.city || ''} ${post.address?.street || ''} ${post.address?.house_number || ''}`
          .toLowerCase()
          .includes(addressFilter.toLowerCase());
        const statusMatch = statusFilter ? post.status === statusFilter : true;
        return addressMatch && statusMatch;
      })
    );
  }, [addressFilter, statusFilter, officePosts]);

  const handleOfficeSelect = (user) => {
    setSelectedOffice(user);
    setCurrentPage(1);
  };

  const handleBack = () => {
    setSelectedOffice(null);
    setOfficePosts([]);
    setFilteredPosts([]);
    setCurrentPage(1);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Biztosan törölni szeretnéd ezt a hirdetést?')) return;
    try {
      await deletePost(postId);
      setOfficePosts(prev => prev.filter(p => p._id !== postId));
      setFilteredPosts(prev => prev.filter(p => p._id !== postId));
      setTotalPosts(prev => prev - 1);
      alert('Hirdetés törölve!');
    } catch (error) {
      alert(error.message || 'Hiba történt a törlés során!');
    }
  };

  const handleSavePost = async (postId, updatedData) => {
    try {
      const updatedPost = await updatePost(postId, updatedData);
      const newPost = updatedPost.data;
      setOfficePosts(prev => prev.map(p => p._id === postId ? { ...p, ...newPost } : p));
      setFilteredPosts(prev => prev.map(p => p._id === postId ? { ...p, ...newPost } : p));
      setEditingPostId(null);
      setIsEditingModalOpen(false);
      alert('Hirdetés módosítva!');
    } catch (error) {
      alert(error.message || 'Hiba történt a módosítás során!');
    }
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setIsEditingModalOpen(false);
  };

  const handleDeleteAllOfficePosts = async (userId) => {
    if (!window.confirm('Biztosan törölni szeretnéd az iroda összes posztját és képét?')) return;
    try {
      const response = await deleteAllUserPosts(userId);
      setOfficePosts([]);
      setFilteredPosts([]);
      setTotalPosts(0);
      setTotalPages(1);
      setCurrentPage(1);
      alert(response.message || 'Az iroda összes posztja törölve!');
    } catch (error) {
      alert(error.message || 'Hiba történt a törlés során!');
    }
  };

  const handlePostsPerPageChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPostsPerPage(newLimit);
    setCurrentPage(1);
  };

  const filteredUsers = users
    .filter((user) =>
      user.companyDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((usersCurrentPage - 1) * usersPerPage, usersCurrentPage * usersPerPage);

  if (loading) return <div className="loading">Betöltés...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!isAdmin) return <div className="error">Nincs jogosultságod ehhez az oldalhoz!</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Felület</h2>
        <div className="header-actions">
          {selectedOffice && (
            <button className="admin-button" onClick={handleBack}>
              Vissza az irodákhoz
            </button>
          )}
          <button
            className="admin-button"
            onClick={() => router.push('/profile/admin/missing-locations')}
          >
            Hiányzó helyszínek
          </button>
        </div>
      </div>

      <div className="admin-content">
        {!selectedOffice ? (
          <div className="admin-card">
            <h3>Irodák</h3>
            <input
              type="text"
              placeholder="Keresés iroda neve vagy email alapján..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setUsersCurrentPage(1);
              }}
              className="search-bar"
            />
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Cégnév</th>
                    <th>Email</th>
                    <th>Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.companyDetails?.name || 'N/A'}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="admin-button"
                            onClick={() => handleOfficeSelect(user)}
                          >
                            Megnyitás
                          </button>
                          <button
                            className="admin-button delete"
                            onClick={async () => {
                              if (!window.confirm('Biztosan törölni szeretnéd ezt az irodát?')) return;
                              try {
                                await deleteUser(user._id);
                                setUsers(prev => prev.filter(u => u._id !== user._id));
                                alert('Iroda törölve!');
                              } catch (error) {
                                alert(error.message || 'Hiba történt a törlés során!');
                              }
                            }}
                          >
                            Törlés
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3">Nincsenek irodák</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {usersTotalPages > 1 && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                  className="admin-button"
                  disabled={usersCurrentPage === 1}
                  onClick={() => setUsersCurrentPage(prev => prev - 1)}
                >
                  Előző
                </button>
                <span>{usersCurrentPage} / {usersTotalPages}</span>
                <button
                  className="admin-button"
                  disabled={usersCurrentPage === usersTotalPages}
                  onClick={() => setUsersCurrentPage(prev => prev + 1)}
                >
                  Következő
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="office-details">
            <div className="admin-card">
              <h3>{selectedOffice.companyDetails?.name} - Hirdetések</h3>
              <button
                className="admin-button delete"
                onClick={() => handleDeleteAllOfficePosts(selectedOffice._id)}
              >
                Összes poszt törlése
              </button>
            </div>

            <div className="admin-card">
              <div className="filter-section">
                <input
                  type="text"
                  placeholder="Szűrés cím alapján..."
                  value={addressFilter}
                  onChange={(e) => {
                    setAddressFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="filter-input"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="filter-select"
                >
                  <option value="">Minden státusz</option>
                  <option value="aktív">Aktív</option>
                  <option value="inaktív">Inaktív</option>
                </select>
                <select
                  value={postsPerPage}
                  onChange={handlePostsPerPageChange}
                  className="filter-select"
                >
                  <option value={10}>10 poszt/oldal</option>
                  <option value={20}>20 poszt/oldal</option>
                  <option value={50}>50 poszt/oldal</option>
                  <option value={100}>100 poszt/oldal</option>
                </select>
              </div>

              <div className="pagination-info">
                <p>Összesen {totalPosts} poszt, {currentPage}. oldal / {totalPages}</p>
              </div>

              <div className="posts-container">
                {filteredPosts.length > 0 ? (
                  <div className="posts-grid">
                    {filteredPosts.map((post) => (
                      <div key={post._id} className="post-card">
                        <h3>{post.title || 'N/A'}</h3>
                        {post.listing_type === 'eladó' && (
                          <p><strong>Ár:</strong> {post.price ? `${post.price} Millió Ft` : 'Nincs megadva'}</p>
                        )}
                        {post.listing_type === 'kiadó' && (
                          <p><strong>Bérleti díj:</strong> {post.rental_price ? `${post.rental_price} Ezer Ft` : 'Nincs megadva'}</p>
                        )}
                        <p><strong>Alapterület:</strong> {post.area ? `${post.area} m²` : 'Nincs megadva'}</p>
                        <p><strong>Státusz:</strong> {post.status || 'aktív'}</p>
                        <p><strong>Cím:</strong> {`${post.address?.city || ''}, ${post.address?.street || ''} ${post.address?.house_number || ''}`}</p>
                        <ImageGallery images={post.images || []} />
                        <div className="post-actions">
                          <button
                            className="action-button edit"
                            onClick={() => {
                              setEditingPostId(post._id);
                              setIsEditingModalOpen(true);
                            }}
                          >
                            Szerkesztés
                          </button>
                          <button
                            className="action-button delete"
                            onClick={() => handleDeletePost(post._id)}
                          >
                            Törlés
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-posts">Nincsenek hirdetések.</p>
                )}
              </div>

              {totalPages > 1 && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <button
                    className="admin-button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Előző
                  </button>
                  <span>{currentPage} / {totalPages}</span>
                  <button
                    className="admin-button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Következő
                  </button>
                </div>
              )}
            </div>

            <Modal
              isOpen={isEditingModalOpen}
              onRequestClose={handleCancelEdit}
              style={{
                content: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '800px',
                  height: 'auto',
                  maxHeight: '90vh',
                  padding: '20px',
                  border: 'none',
                  borderRadius: '0',
                  background: '#fff',
                  overflow: 'auto',
                },
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  zIndex: 1000,
                },
              }}
            >
              {editingPostId && (
                <PostEditForm
                  postId={editingPostId}
                  postData={filteredPosts.find(p => p._id === editingPostId)}
                  onSave={(data) => handleSavePost(editingPostId, data)}
                  onCancel={handleCancelEdit}
                />
              )}
              <button
                style={{
                  position: 'fixed',
                  top: '10px',
                  right: '10px',
                  padding: '10px 20px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  zIndex: 1001,
                }}
                onClick={handleCancelEdit}
              >
                Bezárás
              </button>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;