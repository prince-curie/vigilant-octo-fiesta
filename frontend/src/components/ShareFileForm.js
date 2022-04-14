import { Contract } from "ethers";
import { useState, useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { abi, CONTRACT_ADDRESS } from "../constants/index";
import { providerSignerContext } from "../context/ProviderOrSignerContext";

export default function ShareFileForm(props) {
  const { getProviderOrSigner } = useContext(providerSignerContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSharing = async (id) => {
    if (!walletAddress) {
      return;
    }
    setLoading(true);
    console.log(id);

    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.grantAccess(id, walletAddress);
      
      // // wait for the transaction to get mined
      tx.wait();
      setLoading(false);
      console.log(tx);
      setWalletAddress("");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Popup trigger={<button>Share File</button>} position="top center">
        {loading ? (
          <p>Sharing..</p>
        ) : (
          <label>
            Address to share
            <input
              type="text"
              required
              placeholder="address to share"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </label>
        )}
        <button onClick={() => handleSharing(props.id)}>Share Now</button>
      </Popup>
    </div>
  );
}
