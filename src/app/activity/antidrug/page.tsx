import { getActivityComplexByCategory } from "@/lib/activityComplex";
import ActivityComplexPageContent from "@/components/activity/ActivityComplexPageContent";
import ActivityComplexEmptyState from "@/components/activity/ActivityComplexEmptyState";

export const dynamic = "force-dynamic";

export default async function AntidrugPage() {
  const complex = await getActivityComplexByCategory(
    "Антинаркотическая кампания"
  );

  if (!complex) {
    return (
      <ActivityComplexEmptyState categoryLabel="Антинаркотическая кампания" />
    );
  }

  return <ActivityComplexPageContent complex={complex} />;
}
