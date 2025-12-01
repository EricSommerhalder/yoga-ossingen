import { cms, AngebotPage as AngebotPageSchema } from "@/cms";
import AngebotPageComponent from "../components/AngebotPage";
import { unstable_noStore as noStore } from 'next/cache'

export default async function Angebot() {
    noStore();
    const angebotPage = await cms.get({ type: AngebotPageSchema });
    // @ts-ignore - Types are inferred from schema but component expects interface
    return <AngebotPageComponent data={angebotPage} />;
}
