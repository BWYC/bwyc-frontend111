import { useState } from "react";
import type { Capability } from "sats-connect";
import { BitcoinNetworkType, signMessage } from "sats-connect";

type Props = {
  network: BitcoinNetworkType;
  address: string;
  capabilities: Set<Capability>;
};

const SignMessage = ({ network, address, capabilities }: Props) => {
  const [message, setMessage] = useState("Hello World!");

  const onSignMessageClick = async () => {
    if (!address) return alert("Address is required");

    await signMessage({
      payload: {
        network: {
          type: network,
        },
        address,
        message,
      },
      onFinish: (response) => {
        alert(response);
      },
      onCancel: () => alert("Canceled"),
    });
  };

  if (!capabilities.has("signMessage")) {
    return (
      <div className="container">
        <h3>Sign message</h3>
        <b>The wallet does not support this feature</b>
      </div>
    );
  }

  const signingDisabled = message.length === 0;

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
        gap: "10px",
      }}
    >
      <h3>Sign message</h3>
      <p style={{ color: "orange", overflow: "scroll" }}>
        <b>Address</b>
        <br />
        {address}
      </p>
      <b>Message</b>
      <br />
      <input
        style={{
          background: "transparent",
          padding: "10px",
          border: "solid",
          color: "lightgreen",
          borderRadius: "8px",
          margin: "10px",
          width: "50%",
        }}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <br />
      <div>
        <button
          style={{
            background: "black",
            padding: "10px",
            border: "solid",
            color: "white",
            borderRadius: "8px",
            margin: "10px",
          }}
          onClick={onSignMessageClick}
          disabled={signingDisabled}
        >
          Sign message
        </button>
      </div>
    </div>
  );
};

export default SignMessage;
