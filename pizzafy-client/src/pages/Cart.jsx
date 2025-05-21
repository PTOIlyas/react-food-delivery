import { UseCart } from "../context/CartContext";
import { CHECKOUT, HOME } from "../utils/const";
import { Link, useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate()

  const {
    cartItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = UseCart();

  function handleCheckOut() {
    if (cartItems.length === 0) {
      alert("your's backet is empty! please add some items");
      return;
    }
    navigate(CHECKOUT);
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <>
          <section className="block">
            <div className="container">
              <Link to={HOME} className="back-btn">
                Назад
              </Link>
              <h1 className="title">Моя корзина</h1>
              <p className="alert-danger">
                your backet is empty! Add something in order to receive a bonus
              </p>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="block">
            <div className="container">
              <Link to={HOME} className="back-btn">
                Назад
              </Link>
              <h1 className="title">Моя корзина</h1>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Наименование продукта</th>
                    <th>Фото</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Всего</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>
                        <img
                          src={item.name}
                          className="cart-img"
                          alt={item.name}
                        />
                      </td>
                      <td>{item.price.toLocaleString()} &#8376;</td>
                      <td>
                        <div className="counter">
                          <button className="circle" onClick={()=> decreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
                          <span>{item.quantity}</span>
                          <button className="circle" onClick={() => increaseQuantity(item.id)}>+</button>
                        </div>
                      </td>
                      <td>{(item.price * item.quantity).toLocaleString()} &#8376;</td>
                      <td>
                        <button className="delete-btn" onClick={() => removeFromCart(item.id)}>Удалить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 className="total-price">Итого: {totalPrice.toLocaleString()} &#8376;</h3>
              <div className="cart-action">
                <button onClick={handleCheckOut} className="cart-action__btn">
                  Оформление заказа
                </button>
                <Link to={HOME} className="cart-action__btn">
                  Продолжить покупку
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Cart;
