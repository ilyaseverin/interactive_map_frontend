import { getActivityComplexByCategory } from "@/lib/activityComplex";
import ActivityComplexPageContent from "@/components/activity/ActivityComplexPageContent";
import ActivityComplexEmptyState from "@/components/activity/ActivityComplexEmptyState";

export const dynamic = "force-dynamic";

export default async function AnticorruptionPage() {
  const complex = await getActivityComplexByCategory(
    "Антикоррупционная деятельность"
  );

  if (!complex) {
    return (
      <ActivityComplexEmptyState categoryLabel="Антикоррупционная деятельность" />
    );
  }

  return <ActivityComplexPageContent complex={complex} />;
}
