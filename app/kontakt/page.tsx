import { cms, KontaktPage as KontaktPageSchema } from "@/cms";
import KontaktPageComponent from "../components/KontaktPage";
import { unstable_noStore as noStore } from 'next/cache'

export default async function Kontakt() {
    noStore();
    const kontaktPage = await cms.get({ type: KontaktPageSchema });
    // @ts-ignore - Types are inferred from schema but component expects interface
    return <KontaktPageComponent data={kontaktPage} />;
}
