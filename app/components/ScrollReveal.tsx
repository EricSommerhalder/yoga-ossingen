"use client";

import { useEffect, useRef, ReactNode } from "react";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "fade";
    className?: string;
}

export default function ScrollReveal({
    children,
    delay = 0,
    direction = "up",
    className = "",
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add visible class when element enters viewport
                        setTimeout(() => {
                            element.classList.add(styles.visible);
                        }, delay);
                        // Optionally unobserve after animation
                        observer.unobserve(element);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: "0px 0px -50px 0px", // Start animation slightly before element is fully visible
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`${styles.scrollReveal} ${styles[direction]} ${className}`}
        >
            {children}
        </div>
    );
}
