import React, { useCallback, useContext, useState } from "react";
import Arweave from "arweave";
import { MintContract } from "./Wallet";
import Form from "@rjsf/core";
import ArweaveManager from "./ArweaveManager";

const WalletContext = React.createContext(null);

const schema = {
  title: "test form",
  type: "object",
  properties: {
    contract: {
      type: "string",
      title: "Contract Address",
    },
    editions: {
      type: "number",
      title: "Number of Editions",
    },
    collectables: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          image: {
            type: "string",
          },
          animation_url: {
            type: "string",
          },
          external_url: {
            type: "string",
          },
        },
      },
    },
  },
};

const widgets = {
  Uploader: ({ value, onChange }) => {
    const walletContext = useContext(WalletContext);
    const [arweaveState, setArweaveState] = useState();
    const [file, setFile] = useState();
    const [status, setStatus] = useState("");
    const uploadFile = () => {
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        const weave = Arweave.init();
        try {
          const txn = await weave.createTransaction(
            { data: reader.result },
            walletContext
          );
          txn.addTag("Content-Type", file.type);
          await weave.transactions.sign(txn, walletContext);

          let uploader = await weave.transactions.getUploader(txn);
          while (!uploader.isComplete) {
            await uploader.uploadChunk();
            setStatus(`${uploader.pctComplete}% complete`);
          }
          setStatus("uploaded");
          console.log(uploader);
          console.log(txn.toJSON());
          onChange(`https://arweave.net/${txn.id}`);
        } catch (e) {
          setStatus(e.toString());
        }
      });
      reader.readAsArrayBuffer(file);
    };
    const replace = (evt) => {
      setStatus("");
      onChange(null);
      evt.preventDefault();
    };
    const saveFile = (evt) => {
      setFile(evt.target.files[0]);
      evt.preventDefault();
    };
    return (
      <div>
        <p>{status}</p>
        <p>
          {value || "not uploaded"}
        </p>
        <p>
          {value ? (
            <button onClick={replace}>clear</button>
          ) : (
            <button onClick={uploadFile}>upload</button>
          )}
        </p>
        {file ? "has file" : "no file"}
        <input type="file" onChange={saveFile} />
      </div>
    );
  },
};

const uiSchema = {
  collectables: {
    items: {
      image: {
        "ui:widget": "Uploader",
      },
      animation_url: {
        "ui:widget": "Uploader",
      },
      description: {
        "ui:widget": "textarea",
      },
    },
  },
};

function Page() {
  const [wallet, setWallet] = useState();
  const submitForm = useCallback((value) => {
    console.log(value);
  }, []);
  return (
    <div>
      <MintContract />
      <ArweaveManager hasWallet={setWallet} />

      <h2>Upload your content here</h2>

      <WalletContext.Provider value={wallet}>
        <Form
          onSubmit={submitForm}
          schema={schema}
          uiSchema={uiSchema}
          widgets={widgets}
        />
      </WalletContext.Provider>
    </div>
  );
}

export default Page;
