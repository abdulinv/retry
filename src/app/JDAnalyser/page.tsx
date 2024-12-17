import React from "react";
import DataProvider from "./DataProvider";
import { getJobs } from "../../../lib/fetch";

async function page() {

  const data = await getJobs('jobs');
  return <DataProvider data={data} />;
}

export default page;
