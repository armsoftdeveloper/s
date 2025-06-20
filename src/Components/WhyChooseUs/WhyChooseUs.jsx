import React, { useEffect, useRef } from "react";
import "./whyChooseUs.css";
import { FaLock, FaBolt, FaUserSecret } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
    {
        icon: <FaLock />,
        title: "Secure & Private",
        desc: "We never store your data. All scans are performed anonymously and securely.",
    },
    {
        icon: <FaBolt />,
        title: "Lightning Fast",
        desc: "Get real-time results with our high-performance scanning engine.",
    },
    {
        icon: <FaUserSecret />,
        title: "No Logs Policy",
        desc: "No logging, no tracking — full transparency and privacy guaranteed.",
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const cards = sectionRef.current.querySelectorAll(".why-card");

        gsap.from(cards, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 0.7,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, []);

    return (
        <section className="why-section" ref={sectionRef}>
            <h2 className="why-title">Why Choose Us</h2>
            <div className="why-grid">
                {benefits.map(({ icon, title, desc }) => (
                    <div className="why-card" key={title}>
                        <div className="why-icon">{icon}</div>
                        <h3 className="why-heading">{title}</h3>
                        <p className="why-desc">{desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
