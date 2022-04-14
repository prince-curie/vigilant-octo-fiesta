import { providerSignerContext } from "../context/ProviderOrSignerContext";
import { Contract } from "ethers";
import { abi, CONTRACT_ADDRESS } from "../constants";
import { useContext, useState } from "react";

export default function DisplayAllFiles() {
  const { getProviderOrSigner } = useContext(providerSignerContext);
  const [loading, setLoading] = useState(false);
  const [publicFile, setPublicFile] = useState([]);

  const getPublicFile = async () => {
    //

    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.getPublicFiles(1, 100);
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
    <div className="public-container">
      <h4>Public files</h4>
    
      <div className="public-card-container">
        <div className="public-card">
          <img
            className="public-image"
            src="	https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
            alt="pubic img"
          />
          <div className="card-details">
            <button>private</button>
            <button>share</button>
          </div>
        </div>
        <div className="public-card">
          <img
            className="public-image"
            src="	https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
            alt="pubic img"
          />
          <div className="card-details">
            <button>private</button>
            <button>share</button>
          </div>
        </div>
        <div className="public-card">
          <img
            className="public-image"
            src="	https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
            alt="pubic img"
          />
          <div className="card-details">
            <button>private</button>
            <button>share</button>
          </div>
        </div>
        <div className="public-card">
          <img
            className="public-image"
            src="	https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
            alt="pubic img"
          />
          <div className="card-details">
            <button>private</button>
            <button>share</button>
          </div>
        </div>
        <div className="public-card">
          <img
            className="public-image"
            src="	https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
            alt="pubic img"
          />
          <div className="card-details">
            <button>private</button>
            <button>share</button>
          </div>
        </div>
        <div className="public-card">
          <img
            className="public-image"
            src="	https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
            alt="pubic img"
          />
          <div className="card-details">
            <button>private</button>
            <button>share</button>
          </div>
        </div>
        <div className="public-card">
          <img
            className="public-image"
            src="	https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
            alt="pubic img"
          />
          <div className="card-details">
            <button>private</button>
            <button>share</button>
          </div>
        </div>
        <div className="public-card">
          <img
            className="public-image"
            src="	https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top"
            alt="pubic img"
          />
          <div className="card-details">
            <button>private</button>
            <button>share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
