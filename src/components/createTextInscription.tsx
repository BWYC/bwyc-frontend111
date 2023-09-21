import { useState } from "react";
import type { Capability } from "sats-connect";
import { BitcoinNetworkType, createInscription } from "sats-connect";

type Props = {
  network: BitcoinNetworkType;
  capabilities: Set<Capability>;
};

const CreateTextInscription = ({ network, capabilities }: Props) => {
  const [suggestedMinerFeeRate, setSuggestedMinerFeeRate] = useState<number>(8);

  const [content, setContent] = useState<string>(
    `
    Cross-Chain NFT Community on EVM and BITCOIN as Ordinals. Members have access to Whaleverse. Mint Whalecards or #Whale NFT on Youngparrot to join the club. 
`,
  );
  const [contentType, setContentType] = useState<string>("text/html");
  const onCreateClick = async () => {
    try {
      await createInscription({
        payload: {
          network: {
            type: network,
          },
          contentType,
          content,
          payloadType: "PLAIN_TEXT",
          /** Optional parameters:
          appFeeAddress: "", // the address where the inscription fee should go
          appFee: 1000, // the amount of sats that should be sent to the fee address
          */
          suggestedMinerFeeRate,
        },
        onFinish: (response) => {
          alert(response.txId);
        },
        onCancel: () => alert("Canceled"),
      });
    } catch (error) {
      alert(`An error ocurred: ${error.message}`);
    }
  };

  if (network !== BitcoinNetworkType.Mainnet) {
    return (
      <div
        style={{
          padding: "40px",
          color: "grey",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          fontFamily: "monospace",
        }}
      >
        <h3>Create text inscription</h3>
        <b>This is only available in Mainnet</b>
      </div>
    );
  }

  if (!capabilities.has("createInscription")) {
    return (
      <div>
        <h3
          style={{
            padding: "40px",
            color: "grey",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            fontFamily: "monospace",
          }}
        >
          Create file inscription
        </h3>
        <b>The wallet does not support this feature</b>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        marginLeft: "2%",
        fontFamily: "monospace",
      }}
    >
      <h3
        style={{
          padding: "10px",
          color: "lightcoral",
        }}
      >
        Create Text inscription
      </h3>
      <p
        style={{
          padding: "10px",
          color: "white",
          width: "50%",
          fontFamily: "monospace",
        }}
      >
        Creates an inscription with the desired text and content type. The
        inscription will be sent to your ordinals address.
      </p>
      <p
        style={{
          padding: "10px",
          color: "orange",
          width: "50%",
        }}
      >
        Service FEE: 0.0 ₿TC
      </p>
      <div>
        <p>
          <b
            style={{
              padding: "10px",
              color: "gray",
              width: "50%",
            }}
          >
            Content type
          </b>
          <br />
          <input
            disabled
            style={{
              background: "transparent",
              padding: "10px",
              border: "solid",
              color: "gray",
              borderRadius: "8px",
              margin: "10px",
            }}
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          />
        </p>
        <p>
          <b
            style={{
              padding: "10px",
              color: "gray",
              width: "50%",
            }}
          >
            Content
          </b>
          <br />
          <textarea
            style={{
              background: "transparent",
              padding: "10px",
              border: "solid",
              color: "gray",
              borderRadius: "8px",
              margin: "10px",
              width: "250px",
              height: "200px",
            }}
            placeholder={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </p>
        <p>
          <b
            style={{
              padding: "10px",
              color: "yellow",
              width: "50%",
            }}
          >
            Fee rate
          </b>
          <br />
          <input
            style={{
              background: "transparent",
              padding: "10px",
              border: "solid",
              color: "white",
              borderRadius: "8px",
              margin: "10px",
            }}
            value={suggestedMinerFeeRate}
            onChange={(e) => {
              const newFeeRate = Number(e.target.value);
              setSuggestedMinerFeeRate(
                Number.isNaN(newFeeRate) ? 0 : newFeeRate,
              );
            }}
          />
        </p>
        <button
          style={{
            background: "black",
            padding: "10px",
            border: "solid",
            color: "white",
            borderRadius: "8px",
            margin: "10px",
          }}
          onClick={onCreateClick}
        >
          Create inscription
        </button>
      </div>
    </div>
  );
};

export default CreateTextInscription;
