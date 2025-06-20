import React, { useEffect, useRef } from "react";
import "./statistics.css";

const stats = [
    { title: "Active Scans Today", value: 12580 },
    { title: "Networks Secured", value: 8410 },
    { title: "Threats Detected", value: 3295 },
    { title: "WHOIS Lookups", value: 18732 },
];

export default function Statistics() {
    const refs = useRef([]);

    useEffect(() => {
        const options = {
            threshold: 0.6,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    stats.forEach((stat, i) => {
                        let start = 0;
                        const end = stat.value;
                        const duration = 1500;
                        const increment = end / (duration / 30);

                        const update = () => {
                            start += increment;
                            if (start >= end) {
                                start = end;
                                clearInterval(timer);
                            }
                            if (refs.current[i]) {
                                refs.current[i].textContent = Math.floor(start).toLocaleString();
                            }
                        };
                        const timer = setInterval(update, 30);
                    });
                }
            });
        }, options);

        if (refs.current[0]) {
            observer.observe(refs.current[0].parentNode.parentNode);
        }
    }, []);

    return (
        <section className="stats-section">
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-box">
                        <div className="stat-number" ref={(el) => (refs.current[index] = el)}>
                            0
                        </div>
                        <div className="stat-title">{stat.title}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
