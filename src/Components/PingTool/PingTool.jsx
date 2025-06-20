import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./pingTool.css";

gsap.registerPlugin(ScrollTrigger);

export default function PingTool() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const printTimer = useRef(null);
  const ctrlCPressed = useRef(false);

  const terminalRef = useRef(null);

  const fakeResponse = (host) => [
    `PING ${host} (192.168.1.${Math.floor(Math.random() * 255)}): 56 data bytes`,
    `64 bytes from ${host}: icmp_seq=0 ttl=64 time=${(Math.random() * 100).toFixed(2)} ms`,
    `64 bytes from ${host}: icmp_seq=1 ttl=64 time=${(Math.random() * 100).toFixed(2)} ms`,
    `64 bytes from ${host}: icmp_seq=2 ttl=64 time=${(Math.random() * 100).toFixed(2)} ms`,
    `64 bytes from ${host}: icmp_seq=3 ttl=64 time=${(Math.random() * 100).toFixed(2)} ms`,
    ``,
    `--- ${host} ping statistics ---`,
    `4 packets transmitted, 4 received, 0% packet loss, time 3004ms`,
    `rtt min/avg/max = 15.2/33.5/87.0 ms`,
  ];

  const handlePing = () => {
    if (!input.trim()) return;

    const command = `root@kali:~$ ping ${input}`;
    setLines((prev) => [...prev, command]);
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(null);
    setLoading(true);
    setInput("");
    ctrlCPressed.current = false;

    const linesToPrint = fakeResponse(input);
    let i = 0;

    const printLine = () => {
      if (ctrlCPressed.current) {
        setLines((prev) => [...prev, "^C", ...linesToPrint.slice(-3)]);
        setLoading(false);
        return;
      }

      if (i < linesToPrint.length) {
        setLines((prev) => [...prev, linesToPrint[i]]);
        i++;
        printTimer.current = setTimeout(printLine, 300);
      } else {
        setLoading(false);
      }
    };

    setTimeout(printLine, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "c" && loading) {
        clearTimeout(printTimer.current);
        ctrlCPressed.current = true;
      }

      if (!loading && history.length > 0) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setHistoryIndex((prev) => {
            const newIndex = prev === null ? history.length - 1 : Math.max(prev - 1, 0);
            setInput(history[newIndex]);
            return newIndex;
          });
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setHistoryIndex((prev) => {
            if (prev === null || prev === history.length - 1) {
              setInput("");
              return null;
            }
            const newIndex = prev + 1;
            setInput(history[newIndex]);
            return newIndex;
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, history]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".terminal-section", {
        scrollTrigger: {
          trigger: ".terminal-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="terminal-section">
      <div className="terminal-text">
        <h2 className="terminal-section-title">How It Works ?</h2>
        <p>
          This terminal emulates a real Linux ping tool. Enter any domain or IP and see how the system simulates a live ping session. Use <b>Ctrl + C</b> to stop, and <b>↑ / ↓</b> arrows to recall commands.
        </p>
      </div>

      <div className="terminal-wrapper">
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">root@kali:~</span>
          </div>

          <div className="terminal-body" ref={terminalRef}>
            {lines.map((line, idx) => (
              <div className="terminal-line" key={idx}>
                {line}
              </div>
            ))}

            <div className="terminal-line">
              <span className="prompt">root@kali:~$</span>
              <input
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ping google.com"
                disabled={loading}
                onKeyDown={(e) => e.key === "Enter" && handlePing()}
                autoFocus
              />
              {loading && cursorVisible && <span className="cursor">█</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
