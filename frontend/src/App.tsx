import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "./utils";
import "./App.css";

function App() {
  const [account, setAccount] = useState<string>();
  const [txCount, setTxCount] = useState<number>();
  const [error, setError] = useState<string>();
  const [isMetaMaskChecked, setIsMetaMaskChecked] = useState<boolean>(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const [network, setNetwork] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Check for MetaMask with a delay
  useEffect(() => {
    const checkForMetaMask = setTimeout(() => {
      const isInstalled = typeof window !== "undefined" && window.ethereum !== undefined;
      setIsMetaMaskInstalled(isInstalled);
      setIsMetaMaskChecked(true);
    }, 1000);
    return () => clearTimeout(checkForMetaMask);
  }, []);

  // Detect network
  useEffect(() => {
    const detectNetwork = async () => {
      if (isMetaMaskInstalled) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const net = await provider.getNetwork();
          setNetwork(net.name + ` (chainId: ${net.chainId})`);
        } catch (e) {
          setNetwork("Unknown");
        }
      }
    };
    detectNetwork();
    if (window.ethereum) {
      window.ethereum.on("chainChanged", detectNetwork);
      return () => window.ethereum.removeListener("chainChanged", detectNetwork);
    }
  }, [isMetaMaskInstalled]);

  const connectWallet = async () => {
    setError(undefined);
    if (!isMetaMaskInstalled) {
      setError("MetaMask is not installed. Please install MetaMask to use this application.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    try {
      setLoading(true);
      const [acc] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(acc);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to connect wallet. Please try again.");
    }
  };

  const loadTxCount = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = await getContract(provider);
      const count = await contract.getTransactionCount();
      setTxCount(Number(count));
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (err.code === "BAD_DATA") {
        setError("Contract not found at this address on the current network, or ABI mismatch. Make sure you are connected to the correct network and the contract is deployed.");
      } else {
        setError("Failed to load transaction count. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (account) {
      loadTxCount();
    }
  }, [account]);

  // Listen for accounts changed
  useEffect(() => {
    if (isMetaMaskInstalled) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(undefined);
        }
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [isMetaMaskInstalled]);

  const getButtonText = () => {
    if (loading) return "Loading...";
    if (!isMetaMaskChecked) return "Checking for MetaMask...";
    if (!isMetaMaskInstalled) return "Install MetaMask";
    return account ? "Connected" : "Connect Wallet";
  };

  return (
    <div className="container">
      <div className="card">
        <h2>MultiSig Wallet Frontend</h2>
        <div className="network-info">Network: {network || "-"}</div>
        {error && <div className="error">{error}</div>}
        {!account ? (
          <>
            <button className="main-btn" onClick={connectWallet} disabled={!isMetaMaskChecked || loading}>
              {getButtonText()}
            </button>
            {!isMetaMaskChecked && <p>Checking for MetaMask...</p>}
            {isMetaMaskChecked && !isMetaMaskInstalled && (
              <p>
                <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                  Click here to install MetaMask
                </a>
              </p>
            )}
          </>
        ) : (
          <div className="info-box">
            <p><strong>Connected as:</strong> {account}</p>
            <p><strong>Total Transactions:</strong> {txCount !== undefined ? txCount : loading ? "Loading..." : "-"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default App;

