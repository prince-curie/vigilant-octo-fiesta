import { createContext,  useRef, useState  } from "react";
import { providers } from "ethers";


export const providerSignerContext = createContext()
export default function ProviderOrSignerContext(props) {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  //to get signer or provider
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

 
  /*
    connectWallet: Connects the MetaMask wallet
  */
    const connectWallet = async () => {
        try {
          // Get the provider from web3Modal, which in our case is MetaMask
          // When used for the first time, it prompts the user to connect their wallet
          await getProviderOrSigner();
          setWalletConnected(true);
    
        } catch (err) {
          console.error(err);
        }
      };
    

     
    return (
        <providerSignerContext.Provider value={{web3ModalRef, walletConnected, connectWallet, getProviderOrSigner}}>
            {props.children}
        </providerSignerContext.Provider>
    )

}