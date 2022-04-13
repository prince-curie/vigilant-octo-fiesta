
import { Contract } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import Web3Modal from "web3modal";
import './App.css';
import IpfsFileUpload from './components/IpfsFileUpload';
import { abi, CONTRACT_ADDRESS } from './constants';
import { ipfsContext } from './context/IpfsUploadContext';
import { providerSignerContext } from './context/ProviderOrSignerContext';
function App() {
  const [loading, setLoading] = useState(false)
  //if u need provider or signer
  //signer = getProviderOrSigner(true)
  //provider = getProviderOrSigner()
  //u can also import this mehtods any where in the component as done here
const { walletConnected, web3ModalRef, connectWallet, getProviderOrSigner} = useContext(providerSignerContext)

//to get the file url import the contest and destructure in any component u are creating
const {fileUrl, fileName, fileType } = useContext(ipfsContext)


///sample code of how to use it
const testing = async () => {
  //
  
  
  try{
      const signer = await getProviderOrSigner(true)
      const testingContract = new Contract(
          CONTRACT_ADDRESS,
          abi,
          signer
      )
      console.log(testingContract)
      // const tx = await testingContract.setAccessUser()
      // setLoading(true);
      // // wait for the transaction to get mined
      // tx.wait()
      // setLoading(false)
      // console.log(tx)
    
  } catch(err) {
      console.error(err)
  }
}

  



 // useEffects are used to react to changes in state of the website
      // The array at the end of function call represents what state changes will trigger this effect
      // In this case, whenever the value of `walletConnected` changes - this effect will be called
     
useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      
    }
  }, [walletConnected]);
  console.log(abi, CONTRACT_ADDRESS)
  return (
    <div className="App">
      <IpfsFileUpload />
      
      <button onClick={connectWallet}>{
      walletConnected ? "Connected" : "Connect Wallet"
      }</button>
      <button onClick={testing}>Testing</button>
    </div>
  );
}

export default App;
