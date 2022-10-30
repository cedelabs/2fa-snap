import styled from 'styled-components';

type ButtonProps = {
  content: string;
  disabled: boolean;
  onSubmit: () => void;
};

const ValidateButton = styled.button`
  border-radius: 50px;
  background-color: rgba(16, 152, 252, 1);
  width: 338px;
  padding: 0px, 12px, 0px, 12px;
  border: none;
  color: ${({ theme }) => theme.colors.text.default};
  &:hover:enabled {
    border: none;
    background-color: #4eb3f2;
  }
  &:hover {
    border: none;
  }
`;

const PrimaryButton = ({ content, disabled, onSubmit }: ButtonProps) => {
  return (
    <ValidateButton disabled={disabled} onClick={onSubmit}>
      {content}
    </ValidateButton>
  );
};

export default PrimaryButton;
