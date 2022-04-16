import Head from "next/head";
import ArtList from "../components/ArtList";
import arts from "../utils/arts";
import Link from "next/link";
import { useAppContext } from "../context/state";
import { NFT_CONTRACT_ADDRESS, abi } from "../constants";
import { useEffect } from "react";
import { Contract } from "ethers";
import { useState } from "react";
export default function Home() {
  const { connected, tokenIds, setTokenIds, library } = useAppContext();
  const [_document, set_document] = useState(null);

  const getTokenIdsMinted = async () => {
    try {
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, library);
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
      setTokenIds(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (library) {
      getTokenIdsMinted();
    }
  }, [library, tokenIds]);

  useEffect(() => {
    set_document(document);
  }, []);

  const secondaryConnect = () => {
    _document.getElementById("connectBtn").click();
  };

  const exploreBtn = (
    <Link href="#mint-section">
      <button className="mint" href="#mint-section">
        Explore
      </button>
    </Link>
  );

  const connectWalletNavBtn = (
    <li
      className="nav-item heading-connect"
      style={{ cursor: "pointer" }}
      onClick={secondaryConnect}
    >
      <a
        className="nav-link button contact"
        style={{
          "padding-left": "20px",
          "padding-right": "20px",
          color: "white",
        }}
      >
        Connect wallet
      </a>
    </li>
  );

  return (
    <div>
      <Head>
        <title>Crypto Dev NFT Gallery</title>
        <meta name="description" content="Crypto Dev NFT Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main">
        <div className="main-left">
          <h1 className="title">
          Welcome to Crypto Devs NFT Gallery!
          </h1>
          <div className="description">
            Crypto Dev NFT Gallery is a collection of unique NFT Arts cratfed for
            people who value artworks.
          </div>
          <div className="description">
          Mint Awesome 20 Uniques NFT Arts from our Exclusive Art Collection.
          </div>
          <div className="description">
            {library ? tokenIds : "0"}/20 have been minted
          </div>

          <div>{connected ? exploreBtn : connectWalletNavBtn}</div>
        </div>

        <div className="main-right">
          <img className="image" alt="Crypto Dev NFT Gallery" src="./cryptodev.svg" />
        </div>
      </div>

      <div className="text-center pt-5" id="mint-section">
        <p className="sub-head-title mt-5">Mint NFT from Crypto Dev Gallery</p>
      </div>

      <div className="row m-0">
        <ArtList arts={arts[0]} />
        <ArtList arts={arts[1]} />
        <ArtList arts={arts[2]} />
        <ArtList arts={arts[3]} />
      </div>
    </div>
  );
}
