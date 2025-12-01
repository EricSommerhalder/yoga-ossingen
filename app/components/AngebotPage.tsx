import Image from "next/image";
import styles from "./AngebotPage.module.css";
import { Entry } from "alinea/core";
import ScrollReveal from "./ScrollReveal";

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

interface AngebotPageData {
    title: string;
    introTitle?: string;
    introText?: RichTextParagraph[];
    offerTitle?: string;
    offerText?: RichTextParagraph[];
    scheduleTitle?: string;
    scheduleText?: RichTextParagraph[];
    image1?: AlineaImage;
    image1Alt?: string;
    image2?: AlineaImage;
    image2Alt?: string;
    ctaButton?: string;
    ctaButtonLink?: string;
}

interface AngebotPageProps {
    data: AngebotPageData & Entry;
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

export default function AngebotPage({ data }: AngebotPageProps) {
    return (
        <div className={styles.pageContainer}>
            {/* Intro Section: Text Left, Image Right */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.gridSection}>
                        <ScrollReveal direction="left" delay={100}>
                            <div>
                                {data.introTitle && <h2 className={styles.sectionTitle}>{data.introTitle}</h2>}
                                {data.introText && (
                                    <div className={styles.textContent}>
                                        {renderRichText(data.introText)}
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>

                        {data.image1?.src && (
                            <ScrollReveal direction="right" delay={200}>
                                <div className={`${styles.imageWrapper} ${styles.orderMobileFirst}`}>
                                    <Image
                                        src={data.image1.src}
                                        alt={data.image1Alt || "Yoga"}
                                        fill
                                        className={styles.image}
                                    />
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </section>

            {/* Offer Section: Image Left, Text Right */}
            <section className={styles.sectionAlt}>
                <div className={styles.container}>
                    <div className={styles.gridSection}>
                        {data.image2?.src && (
                            <ScrollReveal direction="left" delay={200}>
                                <div className={`${styles.imageWrapper} ${styles.orderMobileFirst}`}>
                                    <Image
                                        src={data.image2.src}
                                        alt={data.image2Alt || "Yoga"}
                                        fill
                                        className={styles.image}
                                    />
                                </div>
                            </ScrollReveal>
                        )}

                        <ScrollReveal direction="right" delay={100}>
                            <div>
                                {data.offerTitle && <h2 className={styles.sectionTitle}>{data.offerTitle}</h2>}
                                {data.offerText && (
                                    <div className={styles.textContent}>
                                        {renderRichText(data.offerText)}
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Schedule Section */}
            {data.scheduleTitle && (
                <section className={styles.scheduleSection}>
                    <div className={styles.container}>
                        <ScrollReveal direction="up" delay={100}>
                            <h2 className={styles.sectionTitle}>{data.scheduleTitle}</h2>
                            {data.scheduleText && (
                                <div className={styles.scheduleContent}>
                                    {renderRichText(data.scheduleText)}
                                </div>
                            )}
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            {data.ctaButton && (
                <section className={styles.ctaSection}>
                    <div className={styles.container}>
                        <ScrollReveal direction="up" delay={200}>
                            <a
                                href={data.ctaButtonLink || "/kontakt"}
                                className={styles.ctaButton}
                            >
                                {data.ctaButton}
                            </a>
                        </ScrollReveal>
                    </div>
                </section>
            )}
        </div>
    );
}
