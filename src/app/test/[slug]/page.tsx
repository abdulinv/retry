import { getTest } from "../../../../lib/fetch";
import DataProvider from "./DataProvider";

async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  console.log("slug is for test", slug);
  const data = await getTest(`test-${slug}`);
  const sortedData = data.toSorted((a,b)=>(Number(a.doc.date)-Number(b.doc.date)))
  return (
    <>
      <DataProvider data={sortedData} />
    </>
  );
}

export default TestPage;
