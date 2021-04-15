import React from "react";

const ImageLoader = ({ onChange }) => {
  const [uploadedData, setUploadedData] = useState(null);

  const updateFile = (evt) => {
    setUploadedData(null);
  };

  return (
    <div>
      <label>
        <span>image:</span> <input type="file" onChange={updateFile} />
      </label>
      {uploadedData ? <span>uploaded to the permaweb!</span> : <span></span>}
    </div>
  );
};

const Item = ({ data, onChange }) => {
  const onChangeName = (evt) => {
    onChange({ ...data, name: evt.target.value });
  };
  const onChangeDesc = (evt) => {
    onChange({ ...data, description: evt.target.value });
  };
  const onChangeImage = (newURL) => {
    // update arweave uploader
    onChange({ ...data, image_url: newURL });
  };

  return (
    <div>
      <label>
        <span>name:</span> <input value={data.name} onChange={onChangeName} />
      </label>
      <label>
        <span>description:</span>{" "}
        <textarea value={data.description} onChange={onChangeDesc} />
      </label>
      <ImageLoader />
    </div>
  );
};

export default Item;