import { UseCart } from "../../context/CartContext";

function ProductsItem({ product }) {
  const { addToCart } = UseCart();

  function handleAddToCart() {
    addToCart(product);
  }

  return product.price !== undefined && product.price !== null ? (
    <div className="product-item">
      <img
        src={product.image}
        alt={product.name}
        className="product-item__img"
      />
      <h3 className="product-item__title">{product.name}</h3>
      <p className="product-item__description">{product.description}</p>
      <p className="product-item__description">{product.category}</p>
      <div className="product-item__action">
        <strong className="product-item__title">
          {product.price.toLocaleString()} &#8376;
        </strong>
        <button className="add-button" onClick={handleAddToCart}>
          В корзину
        </button>
      </div>
    </div>
  ) : null;
}

export default ProductsItem;
