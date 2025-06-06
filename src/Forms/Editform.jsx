import styles from "./CreateForm.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useInventory } from "../Contexts/ParcelContext";

export default function EditForm() {
  const { updateInventory } = useInventory();
  const { id } = useParams();
  const { cookies } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    async function getInfo() {
      try {
        let res = await axios.get(`http://localhost:3000/api/game/${id}`);

        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getInfo();
  }, []);

  const [formData, setFormData] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (
        formData.title &&
        formData.category &&
        formData.desc &&
        formData.img
      ) {
        let res = await axios.put(
          `http://localhost:3000/api/game/${id}`,
          formData,
          {
            headers: { token: cookies.token },
          }
        );

        updateInventory(id, formData);

        nav(`/product/${id}`);
      } else {
        return alert("Please Fill In Fields");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleCancel() {
    nav("/");
  }

  return (
    <>
      {formData ? (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.createForm}>
            <h3>Edit Game</h3>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              placeholder="Title..."
              value={formData.title}
            />
            <select
              onChange={handleChange}
              name="category"
              value={formData.category}
            >
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
            <input
              onChange={handleChange}
              type="textarea"
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
              />{" "}
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="img"
              placeholder="Image Url..."
              value={formData.img}
            />
            <input type="Submit" value="Edit Game" />
          </form>

          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}