import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as VaultLogo } from '../assets/vault_logo.svg';
import InputText from './InputText';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

type ThirdStepProps = {
  safeName: string;
  ownerAddress: string;
  iExecAddress: string;
  setiExecAddress: (address: string) => void;
  onSubmit: () => void;
  previous: () => void;
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const ThirdStep = ({
  safeName,
  ownerAddress,
  iExecAddress,
  setiExecAddress,
  onSubmit,
  previous,
}: ThirdStepProps) => {
  const [disable, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (iExecAddress.length > 0) {
      setDisabled(false);
    }
  }, [iExecAddress]);

  return (
    <>
      <VaultLogo />
      <h2>2FA SAFE Creation</h2>
      <FormContainer>
        <div>
          <PrimaryButton
            disabled={false}
            content={'Deploy Contract'}
            onSubmit={onSubmit}
          />
          <br />
          <SecondaryButton
            content={'Cancel'}
            disabled={false}
            onClick={previous}
          />
        </div>
      </FormContainer>
    </>
  );
};

export default ThirdStep;
