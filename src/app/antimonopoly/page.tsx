import { notFound } from "next/navigation";
import { getActivityComplexByCategory } from "@/lib/activityComplex";
import ActivityComplexPageContent from "@/components/activity/ActivityComplexPageContent";

export const dynamic = "force-dynamic";

export default async function AntimonopolyPage() {
  const complex = await getActivityComplexByCategory(
    "Антимонопольный комплекс"
  );

  if (!complex) {
    notFound();
  }

  return <ActivityComplexPageContent complex={complex} />;
}

