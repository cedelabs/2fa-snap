import styled from 'styled-components';
import { useState } from 'react';
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';
import ProgressiveBar from '../components/ProgressiveBar';
import {generate2fa} from "../../utils/generate-2fa"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const FlexBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const OnBoarding = () => {
  const [step, setStep] = useState<number>(1);
  const [safeName, setSafeName] = useState<string>('');
  const [ownerAddress, setOwnerAddress] = useState<string>('');
  const [iExecAddress, setiExecAddress] = useState<string>('');

  const nextStep = () => {
    step < 3 ? setStep(step + 1) : setStep(1);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const onSubmitFirstStep = async () => {
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"}) as any[]
    if(!accounts) {
      alert("You have to select 1 account")
      return
    }
    await generate2fa(accounts[0])
    nextStep()
  }

  return (
    <Container>
      <ProgressiveBar step={step} />
      <FlexBox>
      {step === 1 && (
        <FirstStep
          safeName={safeName}
          setSafeName={setSafeName}
          ownerAddress={ownerAddress}
          setOwnerAddress={setOwnerAddress}
          onSubmit={onSubmitFirstStep}
        />
      )}
      {step === 2 && (
        <SecondStep onSubmit={nextStep} previous={handlePrevious} />
      )}
      {step === 3 && (
        <ThirdStep
          safeName={safeName}
          setiExecAddress={setiExecAddress}
          ownerAddress={ownerAddress}
          iExecAddress={iExecAddress}
          onSubmit={nextStep}
          previous={handlePrevious}
        />
      )}
      </FlexBox>
    </Container>
  );
};

export default OnBoarding;
