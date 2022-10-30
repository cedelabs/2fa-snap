import { ethers } from 'ethers';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';

export const getEthersAdapter = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  window.ethereum.enable();
  const safeOwner = provider.getSigner();
  console.log(safeOwner);
  const ethAdapter = new EthersAdapter({
    ethers,
    signer: safeOwner,
  });
  return ethAdapter;
}
