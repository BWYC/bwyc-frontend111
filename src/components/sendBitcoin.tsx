import { useState } from "react";
import type { Capability } from "sats-connect";
import { BitcoinNetworkType, sendBtcTransaction } from "sats-connect";

type Props = {
  network: BitcoinNetworkType;
  address: string;
  capabilities: Set<Capability>;
};

const SendBitcoin = ({ network, address, capabilities }: Props) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0n);

  const onSendBtcClick = async () => {
    await sendBtcTransaction({
      payload: {
        network: {
          type: network,
        },
        recipients: [
          {
            address: recipient,
            amountSats: amount,
          },
          // you can add more recipients here
        ],
        senderAddress: address!,
      },
      onFinish: (response) => {
        alert(response);
      },
      onCancel: () => alert("Canceled"),
    });
  };

  if (network !== BitcoinNetworkType.Testnet)
    return (
      <div
        style={{
          padding: "40px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          marginLeft: "20%",
          fontFamily: "monospace",
        }}
      >
        <h3>Send Bitcoin</h3>
        <div>Only available on testnet</div>
      </div>
    );

  if (!capabilities.has("sendBtcTransaction")) {
    return (
      <div className="container">
        <h3>Send Bitcoin</h3>
        <b>The wallet does not support this feature</b>
      </div>
    );
  }

  const sendDisabled = recipient.length === 0;

  return (
    <div className="container">
      <h3>Send Test Bitcoin</h3>
      <p>
        <b>From address</b>
        <br />
        {address}
      </p>
      <p>
        <b style={{ color: "white" }}>Recipient address</b>
        <hr />
        <br />
        <input
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{
            borderRadius: "8px",
            background: "transparent",
            border: "solid",
            color: "white",
            padding: "10px",
          }}
        />
      </p>

      <p>
        <hr />
        <b style={{ color: "white" }}> Send amount</b>
        <hr />
        <br />
        <input
          style={{
            borderRadius: "8px",
            background: "transparent",
            border: "solid",
            color: "white",
            padding: "10px",
          }}
          type="number"
          value={amount.toString()}
          onChange={(e) => setAmount(BigInt(e.target.value))}
        />
      </p>
      <button
        style={{
          borderRadius: "8px",
          margin: "5%",
          background: "orange",
          border: "solid",
          color: "white",
          padding: "10px",
        }}
        onClick={onSendBtcClick}
        disabled={sendDisabled}
      >
        Send BTC Transaction
      </button>
    </div>
  );
};

export default SendBitcoin;
