import styled from 'styled-components';

type InputProps = {
  input: string;
  setInput?: (value: string) => void;
  placeHolder: string;
  disabled?: boolean;
};

const CustomInputString = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.default};
  padding: 12px 16px;
  background-color: transparent;
  border-radius: 50px;
  width: 338px;
  &:focus {
    outline: none;
    box-shadow: 1px 2px 9px 1px rgba(0, 0, 0, 0.35);
  }
  &:disabled {
    background-color: #5a5a5a7a;
  }
  &:disabled:hover {
   cursor: not-allowed;
`;

const InputText = ({
  input,
  setInput,
  placeHolder,
  disabled = false,
}: InputProps) => {
  return (
    <CustomInputString
      value={input}
      type="text"
      onChange={(e) => (setInput ? setInput(e.target.value) : null)}
      placeholder={placeHolder}
      disabled={disabled}
    />
  );
};

export default InputText;
