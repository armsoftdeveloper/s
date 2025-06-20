import React, { useEffect, useRef } from "react";
import "./feautures.css";
import img1 from "../../assets/feauture-1.png";
import img2 from "../../assets/feauture-2.png";
import img3 from "../../assets/feauture-3.png";
import img4 from "../../assets/feauture-4.png";
import img5 from "../../assets/feauture-5.png";
import img6 from "../../assets/feauture-6.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    img: img1,
    title: "Trusted Tools",
    desc: "Find security holes with trusted open source tools. Get access to tools used by penetration testers and security professionals around the world.",
  },
  {
    img: img2,
    title: "Attacker Focused",
    desc: "Hunt vulnerabilities from the attackers perspective. Simulating real world security events, testing vulnerabilities and incident response.",
  },
  {
    img: img3,
    title: "Know Your Network",
    desc: "Discover the attack surface with tools and open source intelligence. Protect your network with improved visibility.",
  },
  {
    img: img4,
    title: "Experience",
    desc: "Over 1 million scans performed last year. Our vulnerability scanners have been launching packets since 2007.",
  },
  {
    img: img5,
    title: "Find the Problem",
    desc: "Fixing security issues requires you find them. Identify the issue, re-mediate the risk and test again to be sure.",
  },
  {
    img: img6,
    title: "Performance",
    desc: "Optimize your network for speed, reliability, and security.Fast servers optimized for vulnerability scanning across the Internet. No maintenance or installation required."
  }
];

export default function Features() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".feature-card");

    gsap.from(cards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
    });

    const titleEl = titleRef.current;
    const words = titleEl.innerText.split(" ");
    titleEl.innerHTML = words
      .map((word) => `<span class="word">${word}&nbsp;</span>`)
      .join("");

    const wordSpans = titleEl.querySelectorAll(".word");

    gsap.from(wordSpans, {
      scrollTrigger: {
        trigger: titleEl,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, []);

  return (
    <section className="features-section" ref={sectionRef}>
      <h2 className="features-title" ref={titleRef}>
        Online <br />Vulnerability Scanners
      </h2>
      <div className="features-grid">
        {features.map(({ img, title, desc }) => (
          <div className="feature-card" key={title}>
            <img src={img} alt={title} className="feature-img" />
            <h3 className="feature-title">{title}</h3>
            <p className="feature-desc">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
