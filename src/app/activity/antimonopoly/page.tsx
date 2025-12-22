import { getActivityComplexByCategory } from "@/lib/activityComplex";
import ActivityComplexPageContent from "@/components/activity/ActivityComplexPageContent";
import ActivityComplexEmptyState from "@/components/activity/ActivityComplexEmptyState";

export const dynamic = "force-dynamic";

export default async function AntimonopolyPage() {
  const complex = await getActivityComplexByCategory(
    "Антимонопольный комплекс"
  );

  if (!complex) {
    return (
      <ActivityComplexEmptyState categoryLabel="Антимонопольный комплекс" />
    );
  }

  return <ActivityComplexPageContent complex={complex} />;
}
