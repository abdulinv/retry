import { Box,styled,TextField } from "@mui/material";

export const StyledNoteBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'lightBlue',
    maxHeight: '80vh',
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