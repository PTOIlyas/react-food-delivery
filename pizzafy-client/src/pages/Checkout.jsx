import { useState } from "react";
import { UseCart } from "../context/CartContext";
import { CART, HOME } from "../utils/const";
import { Link, useNavigate } from "react-router-dom";
import { a } from "../services/axiosInstance";

function Checkout() {
  const { clearCart, totalPrice, cartItems } = UseCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Almaty",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(function (prevData) {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData || !formData.phone || !formData.address || !formData.city) {
      alert("fill all inputs!");
      return;
    }
    if (cartItems.length === 0) {
      alert("your basket empty");
      navigate(HOME);
      return;
    }

    setIsSubmitting(false);
    const orderTimesTamp = new Date().toISOString();
    const orderData = {
      customer: formData,
      items: cartItems,
      totalPrice: totalPrice,
      orderTimesTamp: orderTimesTamp,
    };
    try {
      const response = await a.post("/orders", orderData);
      alert(
        `your order is received sum ${totalPrice.toLocaleString()} tg, number of order ${
          response.data.id
        } `
      );
      clearCart();
      navigate(HOME);
    } catch (error) {
      console.error(error);
      alert("something wrong");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <section className="block">
      <div className="container">
        <Link to={CART} className="back-btn">
          Назад
        </Link>
        <h1 className="title">Оформление заказа</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name" className="label">
              Ваше имя
            </label>
            <input
              type="text"
              name="name"
              placeholder="Введите имя"
              required
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-control">
            <label htmlFor="phone" className="label">
              Номер телефона
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Введите номер телефона: +7 XXX XXX XX XX"
              required
              value={formData.phone}
              pattern="\+7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}"
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>
          <div className="form-control">
            <label htmlFor="address" className="label">
              Напишите адрес
            </label>
            <textarea
            name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Введите адрес, дом, квартиру, домофон"
              required
            ></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="phone" className="label">
              Укажите город
            </label>
            <select name="city" id="city" value={formData.city} onChange={handleInputChange} disabled={isSubmitting}>
              <option value="Almaty">Алматы</option>
              <option value="Astana">Астана</option>
              <option value="AmirKala">AmirKala</option>
            </select>
          </div>
          <button disabled={isSubmitting} className="send-btn">{isSubmitting ? "order in queque" : "order"}</button>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
