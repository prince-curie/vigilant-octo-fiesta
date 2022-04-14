import { Contract } from "ethers";
import { useContext, useEffect} from "react";
import Web3Modal from "web3modal";
import "./App.css";
import DisplayAllFiles from "./components/DisplayAllFiles";
import IpfsFileUpload from "./components/IpfsFileUpload";
import Navbar from "./components/Navbar";


import { providerSignerContext } from "./context/ProviderOrSignerContext";

function App() {
  
  //if u need provider or signer
  //signer = getProviderOrSigner(true)
  //provider = getProviderOrSigner()
  //u can also import this mehtods any where in the component as done here
  const { walletConnected, web3ModalRef, connectWallet, getProviderOrSigner } =
    useContext(providerSignerContext);

  //to get the file url import the contest and destructure in any component u are creating
  
  

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
  return (
    <>
    <Navbar />

    <div className="container">
        <IpfsFileUpload />

        <DisplayAllFiles />
      </div>

    </>
  );
}

export default App;
