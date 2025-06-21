import React from 'react';
import { Stack } from '@mui/material';
import { StyledSearch } from './styles';
import Filter from './Filter';
import CountControl from './CountControl';
import { Day } from './DayCard';

interface HeadingBarProps {
  mode: string;
  headingColor: string;
  heading: string;
  day: Day['day'];
  tab: string;
  handleTabChange: (arg: string) => void;
  search: string;
  setSearch: (arg: string) => void;
  handleCancel: () => void;
  handleFilter: ({tag,date}:{tag:string,date:string}) => void;
}

function HeadingBar({
  mode,
  headingColor,
  heading,
  day,
  tab,
  handleTabChange,
  search,
  setSearch,
  handleCancel,
  handleFilter,
}: HeadingBarProps) {
  return (
    <Stack
      p={0.8}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-around'}
      sx={{
        color: 'white',
        minHeight: '54px',
        borderRadius: 0,
        backgroundColor: '#1A237E',
      }}
      color={headingColor}
    >
      {heading}
      {mode === 'Monthly' && (
        <StyledSearch
          placeholder="search..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      {mode === 'Monthly' && (
        <Filter onApply={handleFilter} onCancel={handleCancel} />
      )}
      {mode === 'Monthly' && (
        <CountControl day={day} tab={tab} handleTabChange={handleTabChange} />
      )}
    </Stack>
  );
}

export default HeadingBar;
