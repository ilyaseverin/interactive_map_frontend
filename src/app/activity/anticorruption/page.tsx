import { notFound } from "next/navigation";
import { getActivityComplexByCategory } from "@/lib/activityComplex";
import ActivityComplexPageContent from "@/components/activity/ActivityComplexPageContent";

export const dynamic = "force-dynamic";

export default async function AnticorruptionPage() {
  const complex = await getActivityComplexByCategory(
    "Антикоррупционная деятельность"
  );

  if (!complex) {
    notFound();
  }

  return <ActivityComplexPageContent complex={complex} />;
}

