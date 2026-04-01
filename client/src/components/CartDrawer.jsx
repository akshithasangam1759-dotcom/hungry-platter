import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQty, total, count, isOpen, setIsOpen, clearCart } = useCart();
  const navigate = useNavigate();

  const WHATSAPP = '919876543210'; // Change to real number

  const handleWhatsApp = () => {
    const items = cart.map(i => `• ${i.name} x${i.quantity} = ₹${(i.price * i.quantity).toFixed(0)}`).join('\n');
    const msg = encodeURIComponent(`🍽️ *Order from Hungry Platter*\n\n${items}\n\n*Total: ₹${total.toFixed(0)}*\n\nPlease confirm my order. Thank you!`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Order <span>({count} items)</span></h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <small>Add some delicious dishes!</small>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image_url} alt={item.name} onError={e => e.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=80'} />
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                  <div className="qty-controls">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span className="total-amt">₹{total.toFixed(0)}</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: '12px' }} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="whatsapp-order-btn" onClick={handleWhatsApp}>
                <span>🟢</span> Order via WhatsApp
              </button>
              <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
