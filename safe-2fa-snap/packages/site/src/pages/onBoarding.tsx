import styled from 'styled-components';
import { useState } from 'react';
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';
import ProgressiveBar from '../components/ProgressiveBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;
  position: relative;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const OnBoarding = () => {
  const [step, setStep] = useState<number>(1);
  const [safeName, setSafeName] = useState<string>('');
  const [ownerAddress, setOwnerAddress] = useState<string>('');
  const [iExecAddress, setiExecAddress] = useState<string>('');

  const nextStep = () => {
    step < 3 ? setStep(step + 1) : setStep(1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <Container>
      <ProgressiveBar step={step} />
      {step === 1 && (
        <FirstStep
          safeName={safeName}
          setSafeName={setSafeName}
          ownerAddress={ownerAddress}
          setOwnerAddress={setOwnerAddress}
          onSubmit={nextStep}
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
    </Container>
  );
};

export default OnBoarding;
