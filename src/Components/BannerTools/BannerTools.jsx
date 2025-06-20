import React, { useEffect, useRef } from "react";
import "./bannerTools.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    name: "Nmap Port Scanner",
    desc: "Test open ports with our hosted Nmap online port scanner. Scan all ports and net blocks.",
  },
  {
    name: "OpenVAS Scanner",
    desc: "Powerful open source scanner that checks thousands of known security vulnerabilities.",
  },
  {
    name: "Zmap Network Scan",
    desc: "Fast port scanner that sweeps multiple class B networks for open ports.",
  },
  {
    name: "WhatWeb / Wappalyzer",
    desc: "Web reconnaissance from HTTP headers and HTML to detect used technologies.",
  },
  {
    name: "Nikto Web Scanner",
    desc: "Detect vulnerable web scripts and server configuration errors online.",
  },
  {
    name: "Nmap Port Scanner",
    desc: "Test open ports with our hosted Nmap online port scanner. Scan all ports and net blocks.",
  },
];

export default function BannerTools() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(subtitleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: -20,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
    });

    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.4,
    });
  }, []);

  return (
    <section className="banner-tools" ref={sectionRef}>
      <div className="banner-content">
        <h2 className="banner-title" ref={titleRef}>
          Explore Our Powerful Security Tools
        </h2>
        <p className="banner-subtitle" ref={subtitleRef}>
          We offer 30+ tools, including 13 online vulnerability scanners covering the full security assessment cycle — from information gathering and network mapping to vulnerability discovery.
        </p>

        <div className="tools-list">
          {tools.map(({ name, desc }, idx) => (
            <div
              className="tool-card"
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
            >
              <h3 className="tool-name">{name}</h3>
              <p className="tool-desc">{desc}</p>
              <div className="tool-footer">
                <button className="text-button">Use {name}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
