import { useContext, useState } from "react";
import { Contract } from "ethers";
import { ipfsContext } from "../context/IpfsUploadContext";
import { providerSignerContext } from "../context/ProviderOrSignerContext";
import { abi, CONTRACT_ADDRESS } from "../constants";

export default function IpfsFileUpload() {
  const { fileName, fileUrl, fileType, handleUpload, fileLoading } =
    useContext(ipfsContext);
  const { getProviderOrSigner } = useContext(providerSignerContext);
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  async function handleChange(e) {
    handleUpload(e.target.files[0]);
  }

  const handleSubmit = async () => {
    if (!fileUrl) {
      return;
    }

    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
    
      const tx = await contract.uploadFile(fileName, fileUrl, fileType);
      setLoading(true);
      // wait for the transaction to get mined
      tx.wait();
      setLoading(false);
      console.log(tx);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="upload-form">
      <label >
        {" "}
        Make File Private
        <input
          type="checkbox"
          value={isPrivate}
          onClick={() => {
            setIsPrivate(!isPrivate);
          }}
        />
      </label>
      <input type="file" onChange={handleChange} />
      {fileLoading && <p>Loading...</p>}
      <button onClick={handleSubmit}>Upload</button>
      {fileUrl && <img src={fileUrl} alt={fileName} width="400" />}
    </div>
  );
}
