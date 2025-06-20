import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './navbar.css';
import logo from "../../assets/logo.png";

const categories = [
  {
    name: 'Scanners',
    subcategories: [
      {
        name: 'Web',
        links: [
          { name: 'XSS Analyzer', link: '/scanners/web/xss-analyzer' },
          { name: 'SQL Injection Detector', link: '/scanners/web/sql-injection' },
          { name: 'Headers Scanner', link: '/scanners/web/headers-scanner' },
        ],
      },
      {
        name: 'Mobile',
        links: [
          { name: 'Mobile App Scanner', link: '/scanners/mobile/app-scanner' },
          { name: 'APK Analysis', link: '/scanners/mobile/apk-analysis' },
        ],
      },
      {
        name: 'Network',
        links: [
          { name: 'Port Scanner', link: '/scanners/network/port-scanner' },
          { name: 'Nmap Host Discovery', link: '/scanners/network/nmap' },
        ],
      },
      {
        name: 'CMS',
        links: [
          { name: 'WordPress Scanner', link: '/scanners/cms/wordpress' },
          { name: 'Joomla Scanner', link: '/scanners/cms/joomla' },
        ],
      },
    ],
  },
  {
    name: 'Tools',
    subcategories: [
      {
        name: 'Authentication',
        links: [
          { name: 'Password Strength Checker', link: '/tools/auth/password-strength' },
          { name: '2FA Bypass Simulator', link: '/tools/auth/2fa-bypass' },
        ],
      },
      {
        name: 'Analysis',
        links: [
          { name: 'JWT Token Analyzer', link: '/tools/analysis/jwt' },
          { name: 'Sandbox Emulator', link: '/tools/analysis/sandbox' },
        ],
      },
    ],
  },
  {
    name: 'Reconnaissance',
    subcategories: [
      {
        name: 'Network',
        links: [
          { name: 'Subdomain Enumerator', link: '/recon/network/subdomain' },
          { name: 'DNS Zone Transfer', link: '/recon/network/dns-transfer' },
        ],
      },
      {
        name: 'OSINT',
        links: [
          { name: 'WHOIS Lookup', link: '/recon/osint/whois' },
          { name: 'Shodan Intel Grabber', link: '/recon/osint/shodan' },
        ],
      },
    ],
  },
  {
    name: 'Malware Analysis',
    subcategories: [
      {
        name: 'Static',
        links: [
          { name: 'File Hash Scanner', link: '/malware/static/hash-scanner' },
          { name: 'YARA Rule Tester', link: '/malware/static/yara' },
        ],
      },
      {
        name: 'Dynamic',
        links: [
          { name: 'Sandbox Emulator', link: '/malware/dynamic/sandbox' },
          { name: 'Heuristic Flags', link: '/malware/dynamic/heuristic' },
        ],
      },
    ],
  },
  {
    name: 'OSINT Tools',
    subcategories: [
      {
        name: 'Email',
        links: [
          { name: 'Email Breach Checker', link: '/osint/email/breach' },
          { name: 'Username Tracker', link: '/osint/email/username' },
        ],
      },
      {
        name: 'IP & Social',
        links: [
          { name: 'IP Reputation Lookup', link: '/osint/ip/reputation' },
          { name: 'Social Media Scanner', link: '/osint/social/scanner' },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [activeCat, setActiveCat] = useState(null);
  const [activeSubcat, setActiveSubcat] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);
  const dropdownRefs = useRef({}); // Object to store dropdown refs

  useEffect(() => {
    gsap.from(navbarRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (i) => {
    setActiveCat(i);
    setActiveSubcat(0);
    const el = dropdownRefs.current[i];
    if (el) {
      gsap.fromTo(el, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    setActiveCat(null);
  };

  return (
    <nav ref={navbarRef} className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo">
        <img src={logo} alt='logo' />
      </div>

      <ul className="nav-categories">
        {categories.map((cat, i) => (
          <li
            key={cat.name}
            className={`nav-category ${activeCat === i ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="category-btn">{cat.name}</button>

            {activeCat === i && (
              <div
                className="dropdown-menu bottom-dropdown"
                ref={(el) => (dropdownRefs.current[i] = el)}
              >
                <div className="subcategory-row">
                  {cat.subcategories.map((subcat, idx) => (
                    <button
                      key={subcat.name}
                      className={`subcategory-btn ${activeSubcat === idx ? 'active' : ''}`}
                      onMouseEnter={() => setActiveSubcat(idx)}
                    >
                      {subcat.name}
                    </button>
                  ))}
                </div>

                <div className="subcategory-links-column">
                  {cat.subcategories[activeSubcat].links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.link}
                      className="dropdown-item"
                      onClick={() => {
                        setActiveCat(null);
                        setActiveSubcat(0);
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="nav-buttons">
        <button className="btn-outline">Pricing</button>
        <button className="btn-filled">Login</button>
      </div>
    </nav>
  );
}
