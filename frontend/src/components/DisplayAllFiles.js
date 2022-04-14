import { providerSignerContext } from "../context/ProviderOrSignerContext";
import { Contract } from "ethers";
import { abi, CONTRACT_ADDRESS } from "../constants";
import { useContext, useEffect, useState } from "react";

import { ipfsContext } from "../context/IpfsUploadContext";
import ShareFileForm from "./ShareFileForm";

export default function DisplayAllFiles() {
  const { getProviderOrSigner, userAddress, connectWallet, walletConnected } = useContext(
    providerSignerContext
  );
  const [loading, setLoading] = useState(false);
  const [publicFile, setPublicFile] = useState([]);
  const { totalCounter, getTotalCounter } = useContext(ipfsContext);
  getTotalCounter();
  useEffect(() => {
    const getPublicFile = async () => {
      getTotalCounter();
      let data = [];
      setLoading(true);
      for (let i = 0; i < totalCounter; i++) {
        try {
          const provider = await getProviderOrSigner();
          const contract = new Contract(CONTRACT_ADDRESS, abi, provider);
          const tx = await contract.getFileData(i);
          // console.log(tx);
          let response = {
            id: tx._id.toNumber(),
            owner: tx._owner,
            name: tx._name,
            path: tx._url,
            description: tx._description,
            accessLevel: tx._access_level,
          };
          data.push(response);
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
      setPublicFile(data);
      console.log(data);
    };
    getPublicFile();
  }, [totalCounter]);

  const togglePrivate = async (id) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.makeFilePrivate(id);
      // console.log(tx);
      tx.wait();
      console.log(`file with id ${id} is now private`);
      getTotalCounter();
    } catch (err) {
      console.error(err);
    }
  };
  const togglePublic = async (id) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.makeFilePublic(id);
      // console.log(tx);
      tx.wait();
      console.log(`file with id ${id} is now private`);
      getTotalCounter();
    } catch (err) {
      console.error(err);
    }
  };
  const displayFile = publicFile.map((val) => {
    return (
      <div key={val.id} className="public-card">
        <div className="public-card-image">
        <img className="public-image" src={val.path} alt="pubic img" />
        </div>
        {userAddress === val.owner && (
          <div className="card-details">
            {val.accessLevel === "public" ? (
              <button onClick={() => togglePrivate(val.id)}>private</button>
            ) : (
              <button onClick={() => togglePublic(val.id)}>public</button>
            )}
            <ShareFileForm id={val.id} />
          </div>
        )}
      </div>
    );
  });
  return (
    <div className="public-container">
    <div className="connet-button"> 
    <button className="wallet-button" onClick={connectWallet}>
{walletConnected ? "Wallet Connected" : "Connect Wallet"}
 </button>
    </div>
      {loading && <p>fetching data</p>}
      <div className="public-card-container">{publicFile && displayFile}</div>
    </div>
  );
}
