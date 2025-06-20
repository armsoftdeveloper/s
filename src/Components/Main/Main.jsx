import React, { useEffect, useState } from "react";
import "./main.css";
import videoBackground from "../../assets/main_video.mp4";

const title = "The Ultimate Cybersecurity & Network Scanning Hub";

const descriptions = [
  "Discover powerful network scanners, ping tools, and cybersecurity solutions to protect and analyze your digital environment.",
  "Analyze your digital infrastructure with advanced scanning and ping utilities — stay one step ahead of threats.",
  "Unlock powerful scanning, pinging, and monitoring features to safeguard your network environment.",
];

export default function Main() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % descriptions.length);
        setVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          color: "#eee",
          fontFamily: "'Exo 2', sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
          backgroundColor: "#0B0F1A",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.6)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div style={{ position: "relative", zIndex: 10, maxWidth: 900 }}>
          <h1
            style={{
              fontSize: "4rem",
              marginBottom: 24,
              fontWeight: "700",
              color: "#eee",
              textShadow: "none",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              color: "#4ecda7",
              textShadow: "none",
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {descriptions[index]}
          </p>
        </div>
      </main>
    </>
  );
}
