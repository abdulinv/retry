import { Box, CardContent, styled, TextField } from '@mui/material';

export const StyledNoteBox = styled(Box)(({ theme, height }) => ({
  backgroundColor: 'lightBlue',
  maxHeight: `${height}`,
  marginBottom: 1,
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '6px',
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

export const StyledTextInput = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none', // Prevent border on hover
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    color: 'black',
    letterSpacing: '1.4px', // Change text color
  },
}));

export const TextStyles = {
  color: 'rgb(0,0,0,0.8)',
  align: "left",
  maxWidth: '50vw',
  whiteSpace: 'break-spaces',
  p: 0.5,
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: 0.8,
  lineHeight: 1.5,
};

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  maxHeight: '550px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
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
