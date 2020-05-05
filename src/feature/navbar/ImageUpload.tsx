/* eslint-disable max-len */
import React from 'react';


export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = React.useState<File | string>('fileurl');
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>();

  const fileChangedHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files![0]!);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result?.toString());
    };

    reader.readAsDataURL(e.target.files![0]!);
  };

  const submit = () => {
    const fd = new FormData();

    fd.append('file', selectedFile);
    // 토큰 append

    // axios request
  };

  let imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
  if (imagePreviewUrl) {
    imagePreview = (
      <div className="image-container">
        <img src={imagePreviewUrl} alt="icon" width="200" />
        {' '}
      </div>
    );
  }

  return (
    <div className="App">
      <input type="file" name="avatar" onChange={fileChangedHandler} />
      <button type="button" onClick={submit}> Upload </button>
      { imagePreview }
    </div>
  );
}
