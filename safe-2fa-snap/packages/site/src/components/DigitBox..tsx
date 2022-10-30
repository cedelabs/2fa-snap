import styled from 'styled-components';

type DigitBoxProps = {
  value: string;
  setValue: (value: any) => void;
  name?: string;
};

const SingleDigitInput = styled.input`
  height: 35px;
  width: 35px;
  border-radius: 10px;
  background-color: rgba(217, 217, 217, 0.3);
  border: solid 1px #9a9a9a;
  color: ${({ theme }) => theme.colors.text.default};
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  &:focus {
    outline: none;
  }
`;

const DigitBox = ({ value, setValue, name = 'input' }: DigitBoxProps) => {
  return <SingleDigitInput value={value} onChange={setValue} name={name} />;
};

export default DigitBox;
