import React from 'react';
import { StyledTextInput } from './Styles';

interface InputProps {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  visible: boolean;
}

function Input({ visible, onChange, onBlur, value }: InputProps) {
  return (
    <>
      {visible && (
        <StyledTextInput
          value={value}
          autoFocus
          size="small"
          fullWidth
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      )}
    </>
  );
}

export default Input;
