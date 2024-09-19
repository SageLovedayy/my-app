import Layout from "@/components/layout";
import CoreMetrics from "@/components/overview/CoreMetrics";
import ProgressCharts from "@/components/overview/ProgressCharts";
import Recommendations from "@/components/overview/Recommendations";

import exercises from "@/public/assets/data/exercises.json";

export default function Overview() {
  //console.log(exercises);
  return (
    <Layout>
      <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Fitness Overview</h1>
        <CoreMetrics />
        <ProgressCharts />
        <Recommendations />
      </div>
    </Layout>
  );
}
