'use client';

import Image from "next/image";
import styles from "./KontaktPage.module.css";
import { Entry } from "alinea/core";
import { useState, FormEvent } from "react";

// Define the shape of the data based on the CMS schema
interface RichTextParagraph {
    _type: "paragraph";
    content: Array<{
        _type: "text" | "hardBreak";
        text?: string;
    }>;
}

interface AlineaImage {
    _id: string;
    _type: "image";
    _entry: string;
    src?: string;
    width?: number;
    height?: number;
}

interface KontaktPageData {
    title: string;
    addressTitle?: string;
    addressText?: RichTextParagraph[];
    googleMapsUrl?: string;
    image?: AlineaImage;
    imageAlt?: string;
    contactFormTitle?: string;
    recipientEmail?: string;
    nameLabel?: string;
    emailLabel?: string;
    phoneLabel?: string;
    messageLabel?: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    phonePlaceholder?: string;
    messagePlaceholder?: string;
    submitButtonText?: string;
    successMessage?: string;
    errorMessage?: string;
}

interface KontaktPageProps {
    data: KontaktPageData & Entry;
}

// Helper function to render rich text paragraphs
function renderRichText(content: RichTextParagraph[]) {
    return content.map((paragraph, pIndex) => {
        const textContent = paragraph.content.map((item, iIndex) => {
            if (item._type === "hardBreak") {
                return <br key={iIndex} />;
            }
            return <span key={iIndex}>{item.text}</span>;
        });

        return <p key={pIndex}>{textContent}</p>;
    });
}

export default function KontaktPage({ data }: KontaktPageProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    recipientEmail: data.recipientEmail
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.pageContainer}>
            {/* Address and Map Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.addressMapGrid}>
                        <div className={styles.addressContent}>
                            {data.addressTitle && <h2>{data.addressTitle}</h2>}
                            {data.addressText && (
                                <div className={styles.addressText}>
                                    {renderRichText(data.addressText)}
                                </div>
                            )}
                        </div>

                        {data.googleMapsUrl && (
                            <div className={styles.mapWrapper}>
                                <iframe
                                    src={data.googleMapsUrl}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps - Yoga Ossingen Location"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Image Section */}
            {data.image?.src && (
                <section className={styles.imageSection}>
                    <div className={styles.container}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={data.image.src}
                                alt={data.imageAlt || "Yoga Ossingen"}
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Form Section */}
            <section className={styles.sectionAlt}>
                <div className={styles.container}>
                    <div className={styles.formSection}>
                        {data.contactFormTitle && <h2>{data.contactFormTitle}</h2>}

                        {status === 'success' && data.successMessage && (
                            <div className={`${styles.message} ${styles.successMessage}`}>
                                {data.successMessage}
                            </div>
                        )}

                        {status === 'error' && data.errorMessage && (
                            <div className={`${styles.message} ${styles.errorMessage}`}>
                                {data.errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">
                                    {data.nameLabel || 'Name'}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={data.namePlaceholder}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">
                                    {data.emailLabel || 'Email'}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={data.emailPlaceholder}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone">
                                    {data.phoneLabel || 'Telefonnummer'}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={data.phonePlaceholder}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">
                                    {data.messageLabel || 'Nachricht'}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={data.messagePlaceholder}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading'
                                    ? 'Wird gesendet...'
                                    : (data.submitButtonText || 'Absenden')
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
