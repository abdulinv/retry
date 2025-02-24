import React from 'react'
import { TimeDocs } from './types'
import MonthRow from './MonthRow'

interface MonthWiseProps{
    data:TimeDocs[]
}
const months = ["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function MonthWise({data}:MonthWiseProps) {
    console.log("data",data);
    
  return (
    <div>

        {months.map(item=>(
            <MonthRow key={item} month={item} data={data}/>
        ))}

    </div>
  )
}

export default MonthWise