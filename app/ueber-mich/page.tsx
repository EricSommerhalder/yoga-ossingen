import { cms, AboutPage as AboutPageSchema } from "@/cms";
import AboutPageComponent from "../components/AboutPage";
import { unstable_noStore as noStore } from 'next/cache'

export default async function UeberMich() {
    noStore();
    const aboutPage = await cms.get({ type: AboutPageSchema });
    // @ts-ignore - Types are inferred from schema but component expects interface
    return <AboutPageComponent data={aboutPage} />;
}
