import { getTest } from "../../../../lib/fetch";
import DataProvider from "./DataProvider";

async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  console.log("slug is for test", slug);
  const data = await getTest(`test-${slug}`);
  return (
    <>
      <DataProvider data={data} />
    </>
  );
}

export default TestPage;
