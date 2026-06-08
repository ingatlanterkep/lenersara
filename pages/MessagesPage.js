'use client';

import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { getCurrentUser } from '../services/usersService';
import '../styles/MessagesPage.css';
import '../styles/layout/DashboardLayout.css';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unlockingId, setUnlockingId] = useState(null);
  
  const [refundingId, setRefundingId] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reportReason, setReportReason] = useState('spam');
  const [reportComment, setReportComment] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        fetchMessages();
      } catch (err) {
        console.error(err);
      }
    };
    init();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/message/my-messages');
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (messageId) => {
    if (!window.confirm('Biztosan feloldod 5 kreditért?')) return;

    setUnlockingId(messageId);
    try {
      const res = await apiClient.post(`/message/unlock/${messageId}`);
      
      if (res.data.success) {
        setMessages(prev => prev.map(m => 
          m._id === messageId ? { ...m, ...res.data.message } : m
        ));
        setUser(prev => ({ ...prev, credits: res.data.remainingCredits }));
        alert('Sikeresen feloldva! ✅');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Nem sikerült feloldani';
      alert(msg);
    } finally {
      setUnlockingId(null);
    }
  };

  const handleRefund = async (messageId, reason, comment) => {
    setRefundingId(messageId);
    try {
      const res = await apiClient.post(`/message/refund/${messageId}`, {
        reason,
        comment
      });
      
      if (res.data.success) {
        setMessages(prev => prev.map(m => 
          m._id === messageId 
            ? { 
                ...m, 
                creditRefunded: true, 
                refundReason: reason,
                refundComment: comment 
              } 
            : m
        ));
        setUser(prev => ({ ...prev, credits: res.data.remainingCredits }));
        alert('Kreditek sikeresen visszaigényelve!');
        setShowReportModal(false);
        setSelectedMessage(null);
        setReportReason('spam');
        setReportComment('');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Nem sikerült visszaigényelni';
      alert(msg);
    } finally {
      setRefundingId(null);
    }
  };

  const openReportModal = (message) => {
    setSelectedMessage(message);
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setSelectedMessage(null);
    setReportReason('spam');
    setReportComment('');
  };

  const getMainImage = (post) => {
    if (!post?.images || post.images.length === 0) return null;
    const mainImage = post.images.find(img => img.is_main === true);
    if (mainImage) return mainImage.url || mainImage.clear_url;
    return post.images[0].url || post.images[0].clear_url;
  };

  const maskedPhone = (phone) => {
    const clean = phone.replace(/\D/g, '');
    return clean.length > 4 
      ? '*'.repeat(clean.length - 4) + clean.slice(-4)
      : '***';
  };

  const maskedEmail = (email) => 
    email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  if (loading) return <div className="loading">Üzenetek betöltése...</div>;

  return (
    <div className="upload-card">
      <h2>Beérkezett érdeklődések <span className="messages-count">({messages.length})</span></h2>

      <div className="credit-balance">
        <strong>Aktuális egyenleg:</strong>
        <span className={`credit-amount ${(user?.credits || 0) >= 5 ? 'high' : 'low'}`}>
          {user?.credits || 0} kredit
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="no-messages">Nincsenek még üzeneteid.</div>
      ) : (
        <div className="messages-grid">
          {messages.map(msg => {
            const isUnlocked = msg.isUnlocked;
            const isRefunded = msg.creditRefunded;
            const post = msg.postId || {};
            const mainImage = getMainImage(post);

            return (
              <div key={msg._id} className="message-bubble">
                
                <div className="message-image-section">
                  <div className="message-image">
                    {mainImage ? (
                      <img 
                        src={mainImage} 
                        alt=""
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="message-image-placeholder">📷</div>
                    )}
                  </div>
                </div>

                <div className="message-content">
                  
                  <div className="message-row message-row-header">
                    <span className="sender-name">{msg.visitorName}</span>
                    <span className="message-date">
                      {new Date(msg.createdAt).toLocaleDateString('hu-HU')}
                    </span>
                  </div>

                  <div className="message-row message-row-ref">
                    <span className="property-ref-label">Ingatlan referenciaszám:</span>
                    <span className="property-ref-value">
                      {post.reference_number || '—'}
                    </span>
                  </div>

                  <div className="message-row message-row-text">
                    <span className="message-label">Üzenet:</span>
                    <span className="message-text">{msg.message}</span>
                  </div>

                  <div className="message-row message-row-contact">
                    <div className="contact-items">
                      <div className="contact-item">
                        <span className="contact-label">Tel:</span>
                        <span className={`contact-value ${isUnlocked ? 'unlocked' : 'masked'}`}>
                          {isUnlocked ? msg.visitorPhone : maskedPhone(msg.visitorPhone)}
                        </span>
                      </div>
                      <div className="contact-item">
                        <span className="contact-label">Email:</span>
                        <span className={`contact-value ${isUnlocked ? 'unlocked' : 'masked'}`}>
                          {isUnlocked ? msg.visitorEmail : maskedEmail(msg.visitorEmail)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="action-buttons">
                      {!isUnlocked && (
                        <button 
                          onClick={() => handleUnlock(msg._id)}
                          disabled={unlockingId === msg._id || (user?.credits || 0) < 5}
                          className="unlock-button"
                        >
                          {unlockingId === msg._id ? '...' : '🔓 Feloldás (5 kredit)'}
                        </button>
                      )}

                      {isUnlocked && !isRefunded && (
                        <>
                          <div className="unlocked-badge">✓ Feloldva</div>
                          <button 
                            onClick={() => openReportModal(msg)}
                            className="report-button"
                            title="Spam / bot jelentése és kredit visszaigénylése"
                          >
                            🚫 Jelentés
                          </button>
                        </>
                      )}
                      
                      {isUnlocked && isRefunded && (
                        <div className="refunded-badge">
                          🔄 Kredit visszaigényelve
                          {msg.refundReason && (
                            <span className="refund-reason">
                              ({msg.refundReason === 'spam' ? 'Spam' : 
                                msg.refundReason === 'bot' ? 'Bot' :
                                msg.refundReason === 'promotional' ? 'Promóció' :
                                msg.refundReason === 'fake' ? 'Hamis' : 'Egyéb'})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* MODAL */}
      {showReportModal && (
        <div className="modal-overlay visible" onClick={closeReportModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeReportModal}>×</button>
            <h3>⚠️ Kredit visszaigénylés</h3>
            <p>Miért szeretnéd visszaigényelni az 5 kreditet?</p>
            
            <select 
              value={reportReason} 
              onChange={(e) => setReportReason(e.target.value)}
              className="report-select"
            >
              <option value="spam">Spam / Reklám</option>
              <option value="bot">Bot / Automata üzenet</option>
              <option value="promotional">Promóciós / Ajánlat</option>
              <option value="fake">Hamis / Valótlan adatok</option>
              <option value="other">Egyéb</option>
            </select>
            
            <textarea
              placeholder="További megjegyzés (opcionális)"
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
              className="report-textarea"
              rows="3"
            />
            
            <div className="modal-buttons">
              <button 
                onClick={closeReportModal}
                className="modal-cancel"
              >
                Mégse
              </button>
              <button 
                onClick={() => handleRefund(selectedMessage?._id, reportReason, reportComment)}
                disabled={refundingId === selectedMessage?._id}
                className="modal-confirm"
              >
                {refundingId === selectedMessage?._id ? '...' : '✅ Visszaigénylés'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;