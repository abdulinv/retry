import { Box, CardContent, Select, styled, TextField } from '@mui/material';
export const StyledSelect = styled(Select)(() => ({
  fontSize: '14px',
  color: 'grey',
  fontWeight: '500',
  height: '24px',
  width: '150px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export const StyledSearch = styled(TextField)(() => ({
  width: '220px',
  '& .MuiOutlinedInput-root': {
    height: '30px', // set desired height
    borderRadius: '6px',
    color: 'grey',
    fontSize: '14px',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid midnightblue', // remove default border
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid midnightblue',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid midnightblue',
    },
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  maxHeight: '575px',
  minHeight: '575px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const CheckListContainer = styled(Box)(({ theme }) => ({
  maxHeight: '255px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
