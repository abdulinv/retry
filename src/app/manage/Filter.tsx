import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import {  Chip, Stack } from '@mui/material';
import CheckBox from './CheckBox';

interface FilterProps {
  onApply: (data: {
    tag:string;
    date:string;
  }) => void;
  onCancel:()=>void;
}

export default function Filter({ onApply ,onCancel}: FilterProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [category, setCategory] = React.useState('tag');
  const [filterState, setFilterState] = React.useState({
    tag: '',
    date: '',
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleCategoryChange = (categoryName: string) => {
    setCategory(categoryName);
  };

  const handleFilterChange = (label: string) => {
    if (category === 'tag') {
      setFilterState((prev) => ({
        ...prev,
        tag: label,
      }));
    } else {
      if (label === 'today') {
        const today = new Date();

        const formattedDate = today.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });

        setFilterState((prev) => ({
          ...prev,
          date: formattedDate,
        }));
      }

      if (label === 'yesterday') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const formattedDate = yesterday.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });

        setFilterState((prev) => ({
          ...prev,
          date: formattedDate,
        }));
      }

      if (label === 'sevenDays') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const formattedDate = sevenDaysAgo.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });

        setFilterState((prev) => ({
          ...prev,
          date: formattedDate,
        }));
      }
    }
  };

  const handleApply = () => {
    onApply(filterState);
    handleClose();
  };

  const handleCancel = ()=>{
    setFilterState({
      tag:'',
      date:""
    });
    onCancel();
    handleClose();
  }
  return (
    <div>
    
      <Button
       
        sx={{ ms: 4, 
             backgroundColor: (filterState.date || filterState.tag )?"green":"grey"
        }}
        size="small"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        FILTER 
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          p: 4,
          mt: 2,
        }}
      >
           
          {filterState.tag &&   <Chip color='info' sx={{px:1,borderRadius:"8px" ,m:1}} label={filterState.tag}/>}
          {filterState.date &&   <Chip color='info' sx={{px:1,borderRadius:"8px" ,m:1}} label={filterState.date}/>}
        
      
        <Stack
          mt={2}
          flexDirection={'row'}
          justifyContent={'start'}
          gap={2}
          sx={{ minHeight: '200px', minWidth: '250px' }}
        >
          <Stack sx={{minWidth:'100px',fontWeight:"600"}}>
            <Button  sx={{fontWeight:"600",textAlign:"left"}} onClick={handleCategoryChange.bind(null, 'tag')}>
              Tag
            </Button>
            <Button sx={{fontWeight:"600",textAlign:"left"}} onClick={handleCategoryChange.bind(null, 'date')}>
              Date
            </Button>
          </Stack>
          {category === 'tag' && (
            <Stack>
              <CheckBox label="fe" onCheck={handleFilterChange}  />
              <CheckBox label="dsa" onCheck={handleFilterChange} />
              <CheckBox label="be" onCheck={handleFilterChange}  />
            </Stack>
          )}

          {category === 'date' && (
            <Stack>
              <CheckBox label="last 7 days" onCheck={handleFilterChange}  />
              <CheckBox label="yesterday" onCheck={handleFilterChange}  />
              <CheckBox label="today" onCheck={handleFilterChange}  />
              <CheckBox label="last 15 days" onCheck={handleFilterChange} />
              <CheckBox label="last month" onCheck={handleFilterChange} />
            </Stack>
          )}
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"space-evenly"}>
          <Button onClick={handleApply}>Apply</Button>
          <Button onClick={handleCancel}>Clear</Button>
        </Stack>
      </Popover>
    </div>
  );
}
