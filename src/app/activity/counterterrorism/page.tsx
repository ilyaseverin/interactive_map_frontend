import { getActivityComplexByCategory } from "@/lib/activityComplex";
import ActivityComplexPageContent from "@/components/activity/ActivityComplexPageContent";
import ActivityComplexEmptyState from "@/components/activity/ActivityComplexEmptyState";

export const dynamic = "force-dynamic";

export default async function CounterterrorismPage() {
  const complex = await getActivityComplexByCategory(
    "Противодействие терроризму"
  );

  if (!complex) {
    return (
      <ActivityComplexEmptyState categoryLabel="Противодействие терроризму" />
    );
  }

  return <ActivityComplexPageContent complex={complex} />;
}
