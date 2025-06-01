import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface CheckBoxProps {
  label: string;
  onCheck: (label: string) => void;
}
export default function MyCheckbox({ label, onCheck }: CheckBoxProps) {
  const [checked, setChecked] = useState(false);

 

  return (
    <FormControlLabel
      color='grey'
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => {
            if (e.target.checked) onCheck(label);
            else onCheck('');
            setChecked(e.target.checked);
          }}
        />
      }
      label={label}
    />
  );
}
