import Image from "next/image";
import styles from "./AngebotPage.module.css";
import { Entry } from "alinea/core";
import ScrollReveal from "./ScrollReveal";

// Define the shape of the data based on the CMS schema
interface RichTextParagraph {
    _type: "paragraph" | "heading";
    level?: number;
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

interface AboutPageData {
    title: string;
    introText?: RichTextParagraph[];
    philosophyText?: RichTextParagraph[];
    educationText?: RichTextParagraph[];
    image1?: AlineaImage;
    image1Alt?: string;
    image2?: AlineaImage;
    image2Alt?: string;
}

interface AboutPageProps {
    data: AboutPageData & Entry;
}

// Helper function to render rich text paragraphs and headings
function renderRichText(content: RichTextParagraph[]) {
    return content.map((block, pIndex) => {
        // Handle headings
        if (block._type === "heading") {
            const level = block.level || 2;
            const text = block.content.map(c => c.text ?? "").join("");
            // Use a more subtle style for headings within content
            const headingStyle = {
                fontSize: '1.5rem',
                fontWeight: 600,
                marginTop: '2rem',
                marginBottom: '1rem',
                color: 'var(--text-color)'
            };
            if (level === 2) return <h2 key={pIndex} style={headingStyle}>{text}</h2>;
            if (level === 3) return <h3 key={pIndex} style={headingStyle}>{text}</h3>;
            if (level === 4) return <h4 key={pIndex} style={headingStyle}>{text}</h4>;
            return <h2 key={pIndex} style={headingStyle}>{text}</h2>;
        }

        // Handle paragraphs
        const textContent = block.content.map((item, iIndex) => {
            if (item._type === "hardBreak") {
                return <br key={iIndex} />;
            }
            return <span key={iIndex}>{item.text}</span>;
        });

        return <p key={pIndex}>{textContent}</p>;
    });
}

export default function AboutPage({ data }: AboutPageProps) {
    return (
        <div className={styles.pageContainer}>
            {/* Title Section - Full Width */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <ScrollReveal direction="up">
                        <h1 className={styles.sectionTitle} style={{ textAlign: "center" }}>
                            {data.title}
                        </h1>
                    </ScrollReveal>
                </div>
            </section>

            {/* Intro Section: Text Left, Image Right */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.gridSection}>
                        <ScrollReveal direction="left" delay={100}>
                            <div>
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
                                        style={{ objectPosition: "50% 35%" }}
                                    />
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </section>

            {/* Philosophy Section: Image Left, Text Right */}
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
                                {data.philosophyText && (
                                    <div className={styles.textContent}>
                                        {renderRichText(data.philosophyText)}
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            {data.educationText && (
                <section className={styles.scheduleSection}>
                    <div className={styles.container}>
                        <ScrollReveal direction="up" delay={100}>
                            <div className={styles.scheduleContent}>
                                {renderRichText(data.educationText)}
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            )}
        </div>
    );
}
