import { useState } from "react";
import type { Capability } from "sats-connect";
import { BitcoinNetworkType, createInscription } from "sats-connect";

type Props = {
  network: BitcoinNetworkType;
  capabilities: Set<Capability>;
};

const CreateBinaryInscription = ({ network, capabilities }: Props) => {
  const [content, setContent] = useState<string>("");
  const [contentType, setContentType] = useState<string>("image/jpeg");

  const onCreateClick = async () => {
    try {
      await createInscription({
        payload: {
          network: {
            type: network,
          },
          contentType,
          content,
          payloadType: "BASE_64",
          /** Optional parameters:
          appFeeAddress, // the address where the inscription fee should go
          appFee: 1000 // the amount of sats that should be sent to the fee address
          */
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

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setContent("");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const contentString = e.target?.result as string;
      if (!contentString) {
        return;
      }

      const base64String = contentString.split(",")[1];

      setContent(base64String);
    };
    reader.readAsDataURL(selectedFile);
  };

  if (network !== BitcoinNetworkType.Mainnet) {
    return (
      <div className="container">
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
          <b>This is only available in Mainnet</b>
        </h3>
      </div>
    );
  }

  if (!capabilities.has("createInscription")) {
    return (
      <div className="container">
        <h3>Create file inscription</h3>
        <b>The wallet does not support this feature</b>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        color: "grey",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        fontFamily: "monospace",
        width: "100%",
        overflowWrap: "break-word",
        marginLeft: "5%",
      }}
    >
      <h3 style={{ color: "lightskyblue" }}>Create file inscription</h3>
      <hr />
      <p style={{ width: "80%" }}>
        Creates an inscription from a desired file with specified content type.
        The inscription will be sent to your ordinals address.
      </p>
      <hr />
      <div>
        <p>
          <b>Content type</b>
          <br />
          <input
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            disabled
            style={{ background: "transparent", padding: "20px" }}
          />
        </p>
        <p>
          <b>Content</b>
          <br />
          <br />
          <input
            type="file"
            onChange={onFileSelect}
            style={{
              background: "black",
              border: "solid",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
            }}
          />
        </p>
      </div>
      <button
        style={{
          background: "black",
          padding: "10px",
          border: "solid",
          color: "white",
          borderRadius: "8px",
          overflowWrap: "break-word",
          margin: "10px",
          width: "200px",
          overflow: "hidden",
        }}
        onClick={onCreateClick}
      >
        Create inscription
      </button>
    </div>
  );
};

export default CreateBinaryInscription;
