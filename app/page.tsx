import { cms, HomePage as HomePageSchema } from "@/cms";
import HomePageComponent from "./components/HomePage";
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  noStore();
  const homePage = await cms.get({ type: HomePageSchema });
  // @ts-ignore - Types are inferred from schema but component expects interface
  return <HomePageComponent data={homePage} />;
}
