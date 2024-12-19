import React from 'react'
import DataProvider from './DataProvider'
import { getRevision } from '../../../lib/fetch'

async  function page() {

  const data = await getRevision("revision");
  return (
    <>
        <DataProvider data={data}/>
    </>
  )
}

export default page