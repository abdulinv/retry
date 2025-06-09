import React from 'react'
import {
  Typography,
} from "@mui/material";
import Calendar from 'react-calendar';
import { TimeDocs } from './types';

interface DayWiseProps {
  data: TimeDocs[];
}

function DayWise({ data }: DayWiseProps) {
  return (
    <Calendar
      tileClassName={({ date, view }) => {
        const hours =
          view === "month"
            ? getDayHours(date, data)
            : view === "year"
            ? getMonthTotalHours(date, data)
            : null;

        if (hours! > 8) return "bg-high";
        if (hours! > 4) return "bg-medium";
        if (hours! > 0) return "bg-low";
        return "bg-default";
      }}
      tileContent={({ date, view }) => {
        const hours =
          view === "month"
            ? getDayHours(date, data)
            : view === "year"
            ? getMonthTotalHours(date, data)
            : null;

        return hours ? (
          <Typography fontSize={12} fontWeight={700} color="info.main">
            {view === "month" ? `${hours}h` : `${hours}h total`}
          </Typography>
        ) : null;
      }}
    />
  );
}

export default DayWise;

// 👇 Logic for daily hours
function getDayHours(date: Date, data: TimeDocs[]) {
  const date1 = new Date(date);
  for (const item of data) {
    const date2 = new Date(item.doc.date);
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return Number(item.doc.time?.hours || 0);
    }
  }
  return 0;
}

// 👇 Logic for monthly cumulative hours
function getMonthTotalHours(date: Date, data: TimeDocs[]) {
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth();

  return data.reduce((sum, item) => {
    const itemDate = new Date(item.doc.date);
    if (
      itemDate.getFullYear() === targetYear &&
      itemDate.getMonth() === targetMonth
    ) {
      return sum + Number(item.doc.time?.hours || 0);
    }
    return sum;
  }, 0);
}
