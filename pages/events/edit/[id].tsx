import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import styles from 'styles/Form.module.css';
import Layout from 'components/Layout';
import Modal from 'components/Modal';
import { API_URL } from 'config/index';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from 'next';
import ImageUpload from 'components/ImageUpload';
import { parseCookies } from 'helpers/index';
import omit from 'lodash/omit';
type DJEvent = {
  id: string;
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
  image: { formats: { thumbnail: { url: string | '' } } };
};
type Props = { evt: DJEvent; token: string };
const EditEventPage: NextPage<Props> = ({ evt, token }) => {
  const router = useRouter();

  const defaultEventValues = {
    id: evt.id,
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
    image: { formats: { thumbnail: { url: '' } } },
  };
  const [values, setValues] = useState<DJEvent>(defaultEventValues);
  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : ''
  );
  const [showModel, setShowModel] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );
    if (hasEmptyFields) {
      toast.error('Please Fill in All fields');
      return;
    }
    //we need to exclude the image property from evt obj
    //if not, the image will be stringify and become unavailble
    const newVal = omit(values, 'image');
    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(newVal),
    });
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('Unauthorized');
        return;
      }
      toast.error('Something Went Wrong');
    } else {
      const evt = await res.json();
      setValues(defaultEventValues);
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const formateDateToLocalDateStr = (date) => {
    const formatted = new Date(date).toISOString().slice(0, 10);
    return formatted;
  };

  //we re-fetch the image thumbnail for preview after uploading the new image
  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModel(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formateDateToLocalDateStr(values.date)}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt={values.name} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button
          className="btn-secondary btn-icon"
          onClick={() => setShowModel(true)}
        >
          <FaImage />
          Set Image
        </button>
      </div>

      <Modal show={showModel} onClose={() => setShowModel(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;
export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();
  const { token } = parseCookies(req);
  return {
    props: {
      evt,
      token,
    },
  };
}
