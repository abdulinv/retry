import React from 'react';
import ProjectList from './ProjectList';
import { ProjectDocs } from './types';

function DataProvider({ data }: { data: ProjectDocs[] }) {
  return (
    <>
      <ProjectList projectList={data} />
    </>
  );
}

export default DataProvider;
