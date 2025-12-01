import Image from "next/image";
import styles from "./HomePage.module.css";
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

interface HomePageData {
    title: string;
    subtitle?: string;
    headerImage?: AlineaImage;
    headerImageAlt?: string;
    actionButton?: string;
    textContent?: RichTextParagraph[];
    profileImage?: AlineaImage;
    profileImageAlt?: string;
}

interface HomePageProps {
    data: HomePageData & Entry;
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

export default function HomePage({ data }: HomePageProps) {
    return (
        <div>
            {/* Hero Section */}
            <section className={styles.hero}>
                {data.headerImage?.src && (
                    <div className={styles.heroBackground}>
                        <Image
                            src={data.headerImage.src}
                            alt={data.headerImageAlt || "Yoga Header"}
                            fill
                            priority
                            sizes="100vw"
                        />
                    </div>
                )}

                <div className={styles.heroContent}>
                    <h1 className={styles.title}>{data.title}</h1>
                    {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}
                    {data.actionButton && (
                        <a href="/kontakt" className={styles.ctaButton}>
                            {data.actionButton}
                        </a>
                    )}
                </div>
            </section>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.contentGrid}>
                        <ScrollReveal direction="up" delay={100}>
                            <div className={styles.textContent}>
                                {data.textContent && renderRichText(data.textContent)}
                            </div>
                        </ScrollReveal>

                        {data.profileImage?.src && (
                            <ScrollReveal direction="up" delay={300}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={data.profileImage.src}
                                        alt={data.profileImageAlt || "Instructor"}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
