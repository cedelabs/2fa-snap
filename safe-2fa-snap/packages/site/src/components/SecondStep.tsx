import QRCode from 'react-qr-code';
import { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import { ReactComponent as IExecLogo } from '../assets/iExec_logo.svg';
import PrimaryButton from './PrimaryButton';
import DigitBox from './DigitBox.';
import SecondaryButton from './SecondaryButton';

type SecondStepProps = {
  onSubmit: () => void;
  previous: () => void;
};

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const initialValues = [
  {
    id: 1,
    valueInput: '',
  },
  {
    id: 2,
    valueInput: '',
  },
  {
    id: 3,
    valueInput: '',
  },
  {
    id: 4,
    valueInput: '',
  },
  {
    id: 5,
    valueInput: '',
  },
  {
    id: 6,
    valueInput: '',
  },
];

const regex = /^(\s*|\d+)$/u;

function reducer(state: any, action: any) {
  if (action.value.length < 2 && regex.test(action.value)) {
    return state.map((value: { id: number }) => {
      if (value.id === action.type) {
        const nextSibling = document.querySelector(
          `input[name=digit-input-${
            action.value === '' ? value.id - 2 : value.id
          }]`,
        ) as HTMLElement;
        if (nextSibling) {
          nextSibling.focus();
        }
        return { ...value, valueInput: action.value };
      }
      return value;
    });
  }
  return state;
}

const SecondStep = ({ onSubmit, previous }: SecondStepProps) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
  const [values, dispatch] = useReducer(reducer, initialValues);
  const handleValue = (value: { value: string; id: number }) => {
    dispatch({ value: value.value, type: value.id });
  };

  // TO FIX: find a better solution to concat
  useEffect(() => {
    setCode(
      values[0].valueInput +
        values[1].valueInput +
        values[2].valueInput +
        values[3].valueInput +
        values[4].valueInput +
        values[5].valueInput,
    );
  }, [values]);

  useEffect(() => {
    code.length === 6 ? setDisabled(false) : setDisabled(true);
  }, [code]);

  return (
    <Wrapper>
      <IExecLogo />
      <h2 style={{ marginBottom: '40px' }}>
        Your 2FA secret was generated and <br /> stored on an iExec app
      </h2>
      <p>Step 1: Download an authenticator app</p>
      <p>Step 2: Open the app & Scan the QR code</p>
      <QRCode value={'https://youtube.fr'} size={128} />
      <p>Step 3: Verify your code</p>
      <div
        style={{
          display: 'flex',
          width: '264px',
          justifyContent: 'space-between',
          margin: '10px auto',
        }}
      >
        {values.map((value: any, key: number) => (
          <DigitBox
            value={value.valueInput}
            setValue={(e) =>
              handleValue({ value: e.target.value, id: value.id })
            }
            name={`digit-input-${key.toString()}`}
          />
        ))}
      </div>
      <PrimaryButton
        content={'Setup iExec address'}
        disabled={disabled}
        onSubmit={onSubmit}
      />
      <br />
      <SecondaryButton content={'Cancel'} disabled={false} onClick={previous} />
    </Wrapper>
  );
};

export default SecondStep;
