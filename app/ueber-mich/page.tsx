import { cms, AboutPage as AboutPageSchema } from "@/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import styles from "../components/HomePage.module.css"; // Reusing existing styles

// Types
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
    image1?: AlineaImage;
    image1Alt?: string;
    philosophyText?: RichTextParagraph[];
    image2?: AlineaImage;
    image2Alt?: string;
    educationText?: RichTextParagraph[];
}

// Helper to render rich text blocks
function renderRichText(content: RichTextParagraph[]) {
    return content.map((block, idx) => {
        if (block._type === "heading") {
            const level = block.level || 2;
            const text = block.content.map(c => c.text ?? "").join("");
            if (level === 2) return <h2 key={idx} className={styles.heading}>{text}</h2>;
            if (level === 3) return <h3 key={idx} className={styles.heading}>{text}</h3>;
            if (level === 4) return <h4 key={idx} className={styles.heading}>{text}</h4>;
            return <h2 key={idx} className={styles.heading}>{text}</h2>;
        }
        const parts = block.content.map((c, i) => {
            if (c._type === "hardBreak") return <br key={i} />;
            return <span key={i}>{c.text}</span>;
        });
        return <p key={idx}>{parts}</p>;
    });
}

export default async function AboutPage() {
    // Fetch by type to ensure we get the content, as path lookup was returning metadata only
    const data = await cms.get({ type: AboutPageSchema });

    if (!data) {
        notFound();
    }

    const pageData = data as unknown as AboutPageData;
    const intro = pageData.introText || [];
    const philosophy = pageData.philosophyText || [];
    const education = pageData.educationText || [];

    return (
        <div className="main-content">
            <section className={styles.contentSection}>
                <div className={styles.container}>
                    <div className={styles.contentGrid}>
                        {/* Title */}
                        <ScrollReveal direction="up">
                            <h1 className={styles.title} style={{ marginBottom: "2rem" }}>{pageData.title}</h1>
                        </ScrollReveal>

                        {/* Intro Text */}
                        <ScrollReveal direction="up" delay={100}>
                            <div className={styles.textContent}>{renderRichText(intro)}</div>
                        </ScrollReveal>

                        {/* Image 1 */}
                        {pageData.image1?.src && (
                            <ScrollReveal direction="up" delay={200}>
                                <div className={styles.imageContainer} style={{ margin: "3rem 0" }}>
                                    <Image
                                        src={pageData.image1.src}
                                        alt={pageData.image1Alt || "Image 1"}
                                        width={800}
                                        height={500}
                                        style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Philosophy Text */}
                        <ScrollReveal direction="up" delay={300}>
                            <div className={styles.textContent}>{renderRichText(philosophy)}</div>
                        </ScrollReveal>

                        {/* Image 2 */}
                        {pageData.image2?.src && (
                            <ScrollReveal direction="up" delay={400}>
                                <div className={styles.imageContainer} style={{ margin: "3rem 0" }}>
                                    <Image
                                        src={pageData.image2.src}
                                        alt={pageData.image2Alt || "Image 2"}
                                        width={800}
                                        height={500}
                                        style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Education Text */}
                        <ScrollReveal direction="up" delay={500}>
                            <div className={styles.textContent}>{renderRichText(education)}</div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
