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
    `<html>
    <body
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      "
    >
      <p>Hello World!</p>
      <p>I am recursive!!</p>
      <img
        src="/content/6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0"
      />
      <div id="content">Fetching current block height...</div>
      <script>
        const fetchBlockheight = () =>
          fetch("/blockheight")
            .then((response) => response.text())
            .then((data) => {
              document.getElementById("content").textContent =
                "Current block height: " + data;
            })
            .catch(console.error);
        setTimeout(fetchBlockheight, 2000);
      </script>
    </body>
  </html>
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
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
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
        <h3>Create file inscription</h3>
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
        marginLeft: "20%",
      }}
    >
      <h3
        style={{
          padding: "10px",
          color: "white",
        }}
      >
        Create Text inscription
      </h3>
      <p
        style={{
          padding: "10px",
          color: "white",
          width: "50%",
        }}
      >
        Creates an inscription with the desired text and content type. The
        inscription will be sent to your ordinals address.
      </p>
      <p
        style={{
          padding: "10px",
          color: "white",
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
              color: "white",
              width: "50%",
            }}
          >
            Content type
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
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          />
        </p>
        <p>
          <b
            style={{
              padding: "10px",
              color: "white",
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
              color: "white",
              borderRadius: "8px",
              margin: "10px",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </p>
        <p>
          <b
            style={{
              padding: "10px",
              color: "white",
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
