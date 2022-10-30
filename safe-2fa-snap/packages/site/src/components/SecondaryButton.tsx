import styled from 'styled-components';

type ButtonProps = {
  content: string;
  disabled: boolean;
  onClick: () => void;
};

const ValidateButton = styled.button`
  border-radius: 50px;
  background-color: transparent;
  width: 338px;
  padding: 0px, 12px, 0px, 12px;
  border: none;
  color: ${({ theme }) => theme.colors.text.default};
  &:hover:enabled {
    border: none;
  }
  &:hover {
    border: none;
  }
`;

const PrimaryButton = ({ content, disabled, onClick }: ButtonProps) => {
  return (
    <ValidateButton disabled={disabled} onClick={onClick}>
      {content}
    </ValidateButton>
  );
};

export default PrimaryButton;
