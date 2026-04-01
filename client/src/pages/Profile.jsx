import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/orders/my')
      .then(r => setOrders(r.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  const STATUS_COLORS = { pending: '#e87c52', confirmed: 'var(--accent)', preparing: 'var(--accent)', ready: 'var(--green)', delivered: 'var(--green)', cancelled: 'var(--red)' };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">{user?.name[0].toUpperCase()}</div>
          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
          <button className="btn btn-outline" style={{ marginLeft: 'auto' }} onClick={() => { logout(); navigate('/'); }}>
            Logout
          </button>
        </div>

        <div className="orders-section">
          <h3>My Orders</h3>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" style={{ margin: 'auto' }} /></div>
          ) : orders.length === 0 ? (
            <div className="no-orders glass-card">
              <div style={{ fontSize: 48 }}>🛒</div>
              <h4>No orders yet</h4>
              <p>Start exploring our menu and place your first order!</p>
              <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/menu')}>Browse Menu</button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => {
                const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                return (
                  <div key={order.id} className="order-card glass-card">
                    <div className="order-card-header">
                      <div>
                        <span className="order-id">Order #{order.id}</span>
                        <span className="order-date">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <span className="order-status" style={{ color: STATUS_COLORS[order.status] }}>
                        ● {order.status}
                      </span>
                    </div>
                    <div className="order-items">
                      {items.map((item, i) => (
                        <div key={i} className="oi-row">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <span>{order.order_type}</span>
                      <span className="order-total">Total: ₹{order.total_amount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
