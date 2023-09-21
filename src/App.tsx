import type { Capability } from "sats-connect";
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  getCapabilities,
} from "sats-connect";

import { useLocalStorage } from "./useLocalStorage";

import { useEffect, useState } from "react";
import CreateTextInscription from "./components/createTextInscription";

import SendBitcoin from "./components/sendBitcoin";
import SignMessage from "./components/signMessage";

function App1() {
  const [paymentAddress, setPaymentAddress] = useLocalStorage("paymentAddress");
  const [paymentPublicKey, setPaymentPublicKey] =
    useLocalStorage("paymentPublicKey");
  const [ordinalsAddress, setOrdinalsAddress] =
    useLocalStorage("ordinalsAddress");
  const [ordinalsPublicKey, setOrdinalsPublicKey] =
    useLocalStorage("ordinalsPublicKey");
  const [network, setNetwork] = useLocalStorage<BitcoinNetworkType>(
    "network",
    BitcoinNetworkType.Testnet,
  );
  const [capabilityState, setCapabilityState] = useState<
    "loading" | "loaded" | "missing" | "cancelled"
  >("loading");
  const [capabilities, setCapabilities] = useState<Set<Capability>>();

  useEffect(() => {
    const runCapabilityCheck = async () => {
      let runs = 0;
      const MAX_RUNS = 20;
      setCapabilityState("loading");

      // the wallet's in-page script may not be loaded yet, so we'll try a few times
      while (runs < MAX_RUNS) {
        try {
          await getCapabilities({
            onFinish(response) {
              setCapabilities(new Set(response));
              setCapabilityState("loaded");
            },
            onCancel() {
              setCapabilityState("cancelled");
            },
            payload: {
              network: {
                type: network,
              },
            },
          });
        } catch (e) {
          runs++;
          if (runs === MAX_RUNS) {
            setCapabilityState("missing");
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    runCapabilityCheck();
  }, [network]);

  const isReady =
    !!paymentAddress &&
    !!paymentPublicKey &&
    !!ordinalsAddress &&
    !!ordinalsPublicKey;

  const onWalletDisconnect = () => {
    setPaymentAddress(undefined);
    setPaymentPublicKey(undefined);
    setOrdinalsAddress(undefined);
    setOrdinalsPublicKey(undefined);
  };

  const toggleNetwork = () => {
    setNetwork(
      network === BitcoinNetworkType.Testnet
        ? BitcoinNetworkType.Mainnet
        : BitcoinNetworkType.Testnet,
    );
    onWalletDisconnect();
  };

  const onConnectClick = async () => {
    await getAddress({
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
        message: "BWYC Testnet",
        network: {
          type: network,
        },
      },
      onFinish: (response) => {
        const paymentAddressItem = response.addresses.find(
          (address) => address.purpose === AddressPurpose.Payment,
        );
        setPaymentAddress(paymentAddressItem?.address);
        setPaymentPublicKey(paymentAddressItem?.publicKey);

        const ordinalsAddressItem = response.addresses.find(
          (address) => address.purpose === AddressPurpose.Ordinals,
        );
        setOrdinalsAddress(ordinalsAddressItem?.address);
        setOrdinalsPublicKey(ordinalsAddressItem?.publicKey);
      },
      onCancel: () => alert("Request canceled"),
    });
  };

  const capabilityMessage =
    capabilityState === "loading"
      ? "Checking capabilities..."
      : capabilityState === "cancelled"
      ? "Capability check cancelled by wallet. Please refresh the page and try again."
      : capabilityState === "missing"
      ? "Could not find an installed Sats Connect capable wallet. Please install a wallet and try again."
      : !capabilities
      ? "Something went wrong with getting capabilities"
      : undefined;

  if (capabilityMessage) {
    return (
      <div style={{ padding: 30 }}>
        <h1 style={{ color: "white" }}>BWYC CrossChain - {network}</h1>
        <div style={{ color: "white" }}>{capabilityMessage}</div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div style={{ padding: 30 }}>
        <h1 style={{ color: "white" }}>
          ₿WYC CrossChain - <h3 style={{ color: "orange" }}>{network}</h3>
        </h1>
        <div style={{ color: "white" }}>
          Please connect your wallet to continue
        </div>

        <div
          style={{
            background: "black",
            color: "whitesmoke",
            padding: 30,
            marginTop: 10,
            borderRadius: "26px",
            width: "100%",
            border: "solid",
            borderColor: "orange",
          }}
        >
          <button
            style={{
              height: 40,
              width: 180,
              border: "solid",
              borderRadius: "8px",
              color: "wheat",
            }}
            onClick={toggleNetwork}
          >
            Switch Network
          </button>
          <br />
          <br />
          <button
            style={{
              height: 40,
              width: 180,
              border: "solid",
              borderRadius: "8px",
              color: "wheat",
            }}
            onClick={onConnectClick}
          >
            Connect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h2
        style={{
          color: "white",
          marginBottom: "5%",
          marginLeft: "10%",
          fontFamily: "courier",
        }}
      >
        ₿WYC CrossChain - <p style={{ color: "lightgreen" }}>{network}</p>
      </h2>
      <div style={{ width: "auto" }}>
        <div
          style={{
            color: "white",
            fontFamily: "PT Mono",
            marginLeft: "10%",
            height: "140px",
            border: "solid",
            overflowWrap: "break-word",
            padding: "10px",
            borderRadius: "10px",
            width: "280px",
          }}
        >
          Payment Address: {""}
          <hr />
          <p
            style={{
              color: "aqua",
              fontFamily: "PT Mono",
              width: "60%",
              marginLeft: "10%",
              height: "100%",
            }}
          >
            {" "}
            {paymentAddress}
          </p>
        </div>
        <hr></hr>
        <div
          style={{
            color: "white",
            fontFamily: "PT Mono",
            marginLeft: "10%",
            height: "160px",
            border: "solid",
            overflowWrap: "break-word",
            padding: "10px",
            borderRadius: "10px",
            width: "280px",
          }}
        >
          Ordinals Address:
          <hr />
          <p
            style={{
              color: "aqua",
              fontFamily: "PT Mono",
              width: "60%",
              marginLeft: "5%",
              height: "100%",
            }}
          >
            {" "}
            {ordinalsAddress}
          </p>
        </div>
        <br />

        <hr style={{ height: "1px", background: "white" }} />
        <CreateTextInscription network={network} capabilities={capabilities!} />
        <hr style={{ height: "1px", background: "white" }} />
        <SendBitcoin
          address={paymentAddress}
          network={network}
          capabilities={capabilities!}
        />
        <hr style={{ height: "1px", background: "white" }} />
        <SignMessage
          address={ordinalsAddress}
          network={network}
          capabilities={capabilities!}
        />
        <hr style={{ height: "1px", background: "white" }} />
      </div>
      <div style={{ marginLeft: "30%" }}>
        <h3 style={{ color: "white" }}>Disconnect wallet</h3>
        <hr />
        <button
          style={{
            height: 40,
            width: 180,
            border: "solid",
            paddingBottom: "1%",
            borderRadius: "8px",
            color: "white",
            background: "skyblue",
          }}
          onClick={onWalletDisconnect}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}

export default App1;
