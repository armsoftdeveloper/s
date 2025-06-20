import React, { useEffect, useRef } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            footerRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 90%", // когда футер почти внизу экрана
                },
            }
        );
    }, []);

    return (
        <footer className="footer" ref={footerRef}>
            <div className="footer-inner">
                <div className="footer-left">
                    <div className="footer-logo">CyberSec</div>
                    <p className="footer-copy">
                        © {new Date().getFullYear()} CyberSec. All rights reserved.
                    </p>
                </div>

                <div className="footer-links">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/blog">Blog</Link>
                </div>
            </div>
        </footer>
    );
}
