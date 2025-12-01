'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

interface NavigationItem {
    label: string;
    link: string;
}

interface NavbarProps {
    items: NavigationItem[];
}

export default function Navbar({ items }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // On homepage, hide navbar initially until scrolled
    // On other pages, always show
    // On mobile, always show (or at least the hamburger) - User said "only be displayed on the home page after a first scroll (except on mobile)"
    // This implies on mobile it should be visible always? Or maybe the same behavior?
    // "it should only be displayed on the home page after a first scroll (except on mobile)" -> On mobile it is NOT subject to the "only after scroll" rule?
    // So on mobile it is always visible? Or maybe it means "except on mobile where it is always visible".
    // Let's assume on mobile it's always visible or standard behavior.
    // Actually, standard behavior for mobile is usually always visible or sticky.
    // Let's make it always visible on mobile, and on desktop homepage only after scroll.

    const isHidden = isHomePage && !isScrolled;

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''} ${isOpen ? styles.open : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Yoga Ossingen
                </Link>

                {/* Desktop Menu */}
                <ul className={styles.desktopMenu}>
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.link}
                                className={`${styles.navLink} ${pathname === item.link ? styles.active : ''}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className={`${styles.mobileMenuButton} ${isOpen ? styles.open : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>

                {/* Mobile Menu */}
                <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.link}
                                    className={`${styles.navLink} ${pathname === item.link ? styles.active : ''}`}
                                    onClick={toggleMenu}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
