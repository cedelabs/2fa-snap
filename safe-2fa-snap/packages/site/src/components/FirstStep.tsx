import styled from 'styled-components';
import { useEffect, useState, useReducer } from 'react';
import { ReactComponent as SafeLogo } from '../assets/safe_logo.svg';
import PrimaryButton from './PrimaryButton';
import InputText from './InputText';

type FirstStepProps = {
  safeName: string;
  setSafeName: (name: string) => void;
  ownerAddress: string;
  setOwnerAddress: (address: string) => void;
  onSubmit: () => void;
};

const WrapperFirstStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const initialGuardianState : string[] = []
const GUARDIAN_ACTIONS = {
  ADD: "ADD_GUARDIAN",
  EDIT: "EDIT_GUARDIAN"
}
function guardianReducer(state: any, action: any) {
  console.log({prev : state})
  switch (action.type) {
    case GUARDIAN_ACTIONS.ADD:
      return [...state, ""]
    case GUARDIAN_ACTIONS.EDIT:
      state[action.index] = action.value
      return [...state]
  }
}

const FirstStep = ({
  safeName,
  setSafeName,
  setOwnerAddress,
  ownerAddress,
  onSubmit,
}: FirstStepProps) => {
  const [disable, setDisabled] = useState<boolean>(true);
  const [iExecAddress, setiExecAddress] = useState<string>('');
  const [guardians, dispatchGuardians] = useReducer(guardianReducer, initialGuardianState)

  const addGuardian = () => {
    dispatchGuardians({type: GUARDIAN_ACTIONS.ADD})
  }

  useEffect(() => {
    if (guardians?.length && guardians.every(v => v)) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [guardians]);
  return (
    <WrapperFirstStep>
      <SafeLogo width={'100px'} />
      <h2>SAFE setup</h2>
      <FormContainer>
        {
          (guardians || []).map((guardian, index) => (
            <InputText
              key={index}
              input={guardian}
              setInput={(value)=> dispatchGuardians({type: GUARDIAN_ACTIONS.EDIT, index, value})}
              placeHolder={'iExec’s address: to be verified'}
            />
          ))
        }
        <InputText
          input={iExecAddress}
          setInput={setiExecAddress}
          placeHolder={'iExec’s address: to be verified'}
          disabled={true}
        />
        <PrimaryButton
          disabled={false}
          content={'Add guardian'}
          onSubmit={addGuardian}
        />
        <PrimaryButton
          disabled={disable}
          content={'Setup iExec address'}
          onSubmit={onSubmit}
        />
      </FormContainer>
    </WrapperFirstStep>
  );
};

export default FirstStep;
