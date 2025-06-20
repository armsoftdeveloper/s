import React, { useEffect, useRef } from "react";
import "./callToAction.css";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const titleRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const words = title.innerText.split(" ");
    title.innerText = "";

    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.marginRight = "10px";

      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = 0;
        charSpan.style.transform = "translateY(20px)";
        wordSpan.appendChild(charSpan);
      });

      title.appendChild(wordSpan);
    });

    const spans = title.querySelectorAll("span span");
    gsap.to(spans, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
      },
      y: 0,
      opacity: 1,
      stagger: 0.035,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title" ref={titleRef}>
          Ready to test your Infrastructure?
        </h2>
        <Link to="/tools" className="cta-button">
          Try All Tools for Free →
        </Link>
      </div>
    </section>
  );
}
