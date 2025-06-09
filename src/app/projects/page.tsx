import React from 'react';
import DataProvider from './DataProvider';
import { getProjects } from '../../../lib/fetch';

async function page() {
  const data = await getProjects('projects');
  return <DataProvider data={data}/>;
}

export default page;
