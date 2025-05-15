import { CART } from "../utils/const";
import { Link } from "react-router-dom";

function Checkout() {
    return(
         <section className="block">
            <div className="container">
                <Link to={CART} className="back-btn">Назад</Link>
                <h1 className="title">Оформление заказа</h1>
                <form className="form">
                    <div className="form-control">
                        <label htmlFor="name" className="label">Ваше имя</label>
                        <input type="text" name="name" placeholder="Введите имя" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="phone" className="label">Номер телефона</label>
                        <input type="text" name="phone" placeholder="Введите номер телефона: +7 XXX XXX XX XX"
                            required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="phone" className="label">Напишите адрес</label>
                        <textarea placeholder="Введите адрес, дом, квартиру, домофон" required></textarea>
                    </div>
                    <div className="form-control">
                        <label htmlFor="phone" className="label">Укажите город</label>
                        <select name="" id="">
                            <option value="1">Алматы</option>
                            <option value="1">Астана</option>
                        </select>
                    </div>
                    <button className="send-btn">Оформить заказ</button>
                </form>
            </div>
        </section>
    )
}

export default Checkout;