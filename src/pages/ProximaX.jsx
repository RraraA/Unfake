import "./ProximaX.css";
import { useNavigate } from "react-router-dom";

const ProximaX = (setIsAuthenticated) => {

  const navigate = useNavigate();

  return (
    <div className="PXCon">
      <div className="PXBgCon">
        <div className="PXLogoCon">
          <img src="./ProximaXLogo.png" alt="ProximaX Logo" className="PXLogoPic" />
        </div>
        <div className="AboutPX">
          <h1 className="PXTitle">ProximaX</h1>
          <p className="PXDes">
            is a next-generation Integrated and Distributed Ledger Technology (IaDLT) infrastructure platform solution powered by blockchain technology. The core of the ProximaX Sirius platform is the blockchain layer, which provides the base layer of data that interconnects with other layers in a public or private environment. In Unfake, we will be utilizing our industry partner’s blockchain technology to maintain the integrity of our Checked Algorithm Score.
          </p>
          <a href="https://www.proximax.ltd/en" target="_blank" rel="noopener noreferrer">
            <button className="PXBtn">Visit ProximaX</button>
          </a>
        </div>
      </div>
      <div className="UnfakeBgCon">
        <div className="AboutUn">
          <h1 className="UnfakeTitle">Unfake</h1>
          <p className="UnDes">
            As Unfake is on a mission to fight againts the spread of fake news on the social media platform X, we will be utilizing our industry partner’s blockchain technology to maintain the integrity of our Checked Algorithm Score.
          </p>
          <button className="PXBtn" onClick={() => navigate("/unfake")}> Learn More</button>
        </div>
        <div className="UnfakeLogoCon">
          <img src="./Logo.png" alt="Unfake Logo" className="UnLogo"/>
        </div>
      </div>
      <div className="KeyFeatCon">
        <h1>Key Features of ProximaX Sirius:</h1>
        <p className="PXKeyFeat">
          <br /><br /><strong>1. Blockchain:</strong> <br />The blockchain layer that forms the base of the platform and allows for secure, decentralized transactions and data storage.
          <br /><br /><strong>2. Streaming:</strong> <br />The Sirius Stream Protocol (SSP) provides a high-security and high-performance streaming layer for real-time messaging and streaming services with end-to-end encryption.
          <br /><br /><strong>3. Storage:</strong> <br />The distributed file management system (DFMS) protocol enables decentralized, encrypted, and secure file storage.
          <br /><br /><strong>4. Database:</strong> <br />The database layer uses MongoDB as the document-oriented database, driven by the Tendermint core for distributed network enforcement.
          <br /><br />
        </p>
      </div>
    </div>
  );
};

export default ProximaX;
