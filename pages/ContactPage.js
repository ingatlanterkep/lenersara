'use client';

import React from 'react';
import '../styles/ArticlePage.css';

const ContactPage = () => {
  return (
    <div className="article-container">
      <div className="article-wrapper">
        <header className="article-header">
          <h1 className="article-title">Kapcsolat:</h1>
        </header>

        <section className="article-section">
          <h2>Elérhetőségek</h2>
          <p>
            Ha bármilyen kérdésed van, észrevételed, vagy segítségre van szükséged a platform használatával kapcsolatban, 
            nyugodtan vedd fel velünk a kapcsolatot az alábbi módokon:
          </p>

          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <li>
              <strong>Telefonszám:</strong>{' '}
              <a href="tel:+36206240061" style={{ color: '#5099ce', textDecoration: 'none' }}>
                +36 20 624 0061
              </a>
            </li>
            <li>
              <strong>Email cím:</strong>{' '}
              <a href="mailto:kapcsolat@ingatlan-terkep.hu" style={{ color: '#5099ce', textDecoration: 'none' }}>
                kapcsolat@ingatlan-terkep.hu
              </a>
            </li>
          </ul>

          <h2 style={{ marginTop: '40px' }}>Közösségi média</h2>
          <p>
            Kövess minket az alábbi platformokon, hogy mindig naprakész legyél az új funkciókról, ingatlanpiaci hírekről és tippekről:
          </p>

          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <li>
              <strong>Facebook:</strong>{' '}
              <a 
                href="https://www.facebook.com/people/Ingatlan-T%C3%A9rk%C3%A9p/61574143888873/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#5099ce', textDecoration: 'none' }}
              >
                facebook.com/Ingatlan-Térkép
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{' '}
              <a 
                href="https://www.linkedin.com/company/ingatlan-térkép" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#5099ce', textDecoration: 'none' }}
              >
                linkedin.com/company/ingatlan-térkép
              </a>
            </li>
            <li>
              <strong>Instagram:</strong>{' '}
              <a 
                href="https://www.instagram.com/ingatlan_terkep/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#5099ce', textDecoration: 'none' }}
              >
                instagram.com/ingatlan_terkep
              </a>
            </li>
            <li>
              <strong>X (Twitter):</strong> Hamarosan elérhető!
            </li>
          </ul>

          <p style={{ marginTop: '30px', fontStyle: 'italic' }}>
            Várjuk visszajelzéseidet, ötleteidet – együtt tesszük még jobbá az Ingatlan-Térképet!
          </p>
        </section>

        <footer className="article-footer">
          <p className="copyright-notice">
            © 2026 Ingatlan-Térkép. Minden jog fenntartva.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ContactPage;