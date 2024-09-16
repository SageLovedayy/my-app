import Layout from "@/components/layout";
import { Input } from "@mui/material";
import exercises from "@/public/assets/data/exercises.json";

export default function Overview() {
  console.log(exercises);
  return (
    <Layout>
      <div className="relative">
        <p>This is the overview page</p>
      </div>
    </Layout>
  );
}
