import { ethers } from "ethers";
import abi from "./abi.json";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const getContract = async (provider: ethers.BrowserProvider) => {
  try {
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  } catch (error) {
    console.error("Failed to get contract:", error);
    throw new Error("Failed to initialize contract. Please check your connection and try again.");
  }
};
