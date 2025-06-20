import React, { useEffect, useRef } from "react";
import "./whatYouCanDo.css";
import videoBackground from "../../assets/video4.mp4";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FaNetworkWired, FaSearch, FaBug, FaShieldAlt,
    FaServer, FaRoute, FaLock, FaGlobe
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const actions = [
    {
        icon: <FaNetworkWired />,
        title: "Network Scan",
        desc: "Perform detailed network scans to uncover active hosts and services.",
    },
    {
        icon: <FaSearch />,
        title: "Port Analysis",
        desc: "Identify open ports and understand their security implications.",
    },
    {
        icon: <FaBug />,
        title: "Vulnerability Check",
        desc: "Detect known vulnerabilities in your infrastructure.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Threat Intelligence",
        desc: "Analyze and cross-check IPs and domains against threat databases.",
    },
    {
        icon: <FaServer />,
        title: "WHOIS & DNS Lookup",
        desc: "Gather DNS and registration information for any domain.",
    },
    {
        icon: <FaRoute />,
        title: "Ping & Traceroute",
        desc: "Track response times and routing paths for diagnostics.",
    },
    {
        icon: <FaLock />,
        title: "SSL Certificate Check",
        desc: "Verify SSL certificate status and expiration for secure connections.",
    },
    {
        icon: <FaGlobe />,
        title: "GeoIP Location",
        desc: "Determine the physical location of IP addresses across the globe.",
    },
];

export default function WhatYouCanDo() {
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            },
            y: -40,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        });

        gsap.from(cardsRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.2,
        });
    }, []);

    return (
        <section className="actions-section" ref={sectionRef}>
            <video autoPlay muted playsInline className="video-bg">
                <source src={videoBackground} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="actions-overlay">
                <h2 className="actions-title" ref={titleRef}>What You Can Do</h2>
                <div className="actions-grid">
                    {actions.map(({ icon, title, desc }, index) => (
                        <div
                            className="action-card"
                            key={title}
                            ref={(el) => (cardsRef.current[index] = el)}
                        >
                            <div className="action-icon">{icon}</div>
                            <h3 className="action-title">{title}</h3>
                            <p className="action-desc">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
