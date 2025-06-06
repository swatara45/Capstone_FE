import styles from "./CreateForm.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useParcel } from "../Contexts/ParcelContext";

export default function CreateForm() {
  const { addToParcel } = useParcel();  // renamed from addToInventory to addToParcel
  const { cookies } = useAuth();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0.0,
    desc: "",
    qty: 0,
    img: "",
  });

  function handleChange(e) {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (formData.title && formData.category && formData.desc && formData.img) {
        let res = await axios.post(`http://localhost:3000/api/parcels`, formData, {
          headers: { token: cookies.token },
        });

        addToParcel(res.data);
        nav("/dashboard");
      } else {
        alert("Please Fill In Fields");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.createForm}>
      <h3>Add New Parcel</h3>
      <input
        onChange={handleChange}
        type="text"
        name="title"
        placeholder="Title..."
        value={formData.title}
      />
      <select onChange={handleChange} name="category" value={formData.category}>
        <option value="">...Choose One</option>
        <option value="Board">Board</option>
        <option value="Dice">Dice</option>
        <option value="Card">Card</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Video">Video</option>
        <option value="Other">Other</option>
      </select>
      <label>
        Price:
        <input
          onChange={handleChange}
          type="number"
          name="price"
          value={formData.price}
        />
      </label>
      <textarea
        onChange={handleChange}
        name="desc"
        placeholder="Please Enter a Description"
        value={formData.desc}
      />
      <label>
        Quantity:
        <input
          onChange={handleChange}
          type="number"
          name="qty"
          min={0}
          value={formData.qty}
        />
      </label>
      <input
        onChange={handleChange}
        type="text"
        name="img"
        placeholder="Image Url..."
        value={formData.img}
      />
      <input type="submit" value="Add Parcel" />
      <button type="button" onClick={() => nav("/dashboard")}>
        Cancel
      </button>
    </form>
  );
}
