import styled from 'styled-components';

type ProgressiveBarProps = {
  step: number
}

const StepRound = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 100px;
  border: solid 2px white;
  background-color: rgba(191, 186, 186, 0.5);
  display: grid;
  place-items: center;
  font-size: 2rem;
`;

const Bar = styled.div`
  height: 4px;
  width: 416px;
  background-color: white;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1034px;
`;

const ProgressiveBar = ({ step }: ProgressiveBarProps) => {
  return (
    <Wrapper>
      <StepRound style={{ backgroundColor: '#008C73' }}>1</StepRound>
      <Bar style={{ backgroundColor: step >= 2 ? '#008C73' : 'null' }} />
      <StepRound style={{ backgroundColor: step >= 2 ? '#008C73' : 'null' }}>
        2
      </StepRound>
      <Bar style={{ backgroundColor: step >= 3 ? '#008C73' : 'null' }} />
      <StepRound style={{ backgroundColor: step >= 3 ? '#008C73' : 'null' }}>
        3
      </StepRound>
    </Wrapper>
  );
};

export default ProgressiveBar;
