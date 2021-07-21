import styles from 'styles/Form.module.css';
import { useState } from 'react';
import { API_URL } from 'config/index';
const ImageUpload = ({ evtId, imageUploaded, token }) => {
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    //don't hit the update event button in the event form, or the image will be stringify, and it will not work.
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (res.ok) {
      imageUploaded();
    }
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={styles.form}>
      <h1>Ppload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" name="uploadImage" onChange={handleFileChange} />
          <input type="submit" value="Upload" className="btn" />
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
