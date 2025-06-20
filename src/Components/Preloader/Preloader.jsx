import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./preloader.css";

export default function Preloader({ onFinish }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Через 2 секунды после анимации скрываем прелоадер
        setTimeout(() => {
          onFinish();
        }, 500);
      },
    });

    // Анимация текста "CyberScan" - появление с эффектом растягивания по вертикали + fadeIn
    tl.fromTo(
      textRef.current,
      { scaleY: 0, opacity: 0, transformOrigin: "center top" },
      { scaleY: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    )
      // Задержка, чтобы текст подержался
      .to(textRef.current, { duration: 0.5, delay: 1 })
      // Анимация скрытия всего контейнера (прелоадера)
      .to(containerRef.current, { opacity: 0, duration: 0.7, ease: "power2.out" });

  }, [onFinish]);

  return (
    <div className="preloader" ref={containerRef}>
      <h1 className="preloader-text" ref={textRef}>
        CyberScan
      </h1>
    </div>
  );
}
