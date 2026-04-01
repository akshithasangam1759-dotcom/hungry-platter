import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './Admin.css';

const TABS = ['Overview', 'Orders', 'Menu', 'Reservations', 'Users', 'Messages' , 'Login Logs'];

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Overview');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'breakfast', image_url: '' });
  const [loginLogs, setLoginLogs] = useState([]);

  useEffect(() => {
    if (!isAdmin) { navigate('/login'); return; }
    fetchStats();
  }, []);

  useEffect(() => {
    if (tab === 'Orders') fetchOrders();
    else if (tab === 'Menu') fetchMenu();
    else if (tab === 'Reservations') fetchReservations();
    else if (tab === 'Users') fetchUsers();
    else if (tab === 'Messages') fetchMessages();
  }, [tab]);
  useEffect(() => {
    if (tab === 'Orders') fetchOrders();
    else if (tab === 'Menu') fetchMenu();
    else if (tab === 'Reservations') fetchReservations();
    else if (tab === 'Users') fetchUsers();
    else if (tab === 'Messages') fetchMessages();
    else if (tab === 'Login Logs') fetchLoginLogs(); // 👈 Add this line
}, [tab]);

  const fetchStats = async () => { try { const r = await api.get('/admin/stats'); setStats(r.data); } catch {} };
  const fetchOrders = async () => { try { setLoading(true); const r = await api.get('/orders'); setOrders(r.data); } catch {} finally { setLoading(false); } };
  const fetchMenu = async () => { try { setLoading(true); const r = await api.get('/menu'); setMenu(r.data); } catch {} finally { setLoading(false); } };
  const fetchReservations = async () => { try { setLoading(true); const r = await api.get('/reservations'); setReservations(r.data); } catch {} finally { setLoading(false); } };
  const fetchUsers = async () => { try { setLoading(true); const r = await api.get('/admin/users'); setUsers(r.data); } catch {} finally { setLoading(false); } };
  const fetchMessages = async () => { try { setLoading(true); const r = await api.get('/contact'); setMessages(r.data); } catch {} finally { setLoading(false); } };
  const fetchLoginLogs = async () => { 
  try { 
    setLoading(true); 
    const r = await api.get('/admin/login-logs'); 
    setLoginLogs(r.data); 
  } catch {} 
  finally { setLoading(false); } 
};

  const updateOrderStatus = async (id, status) => {
    try { await api.put(`/orders/${id}/status`, { status }); fetchOrders(); toast.success('Status updated'); } catch { toast.error('Failed'); }
  };

  const updateReservationStatus = async (id, status) => {
    try { await api.put(`/reservations/${id}/status`, { status }); fetchReservations(); toast.success('Updated'); } catch { toast.error('Failed'); }
  };

  const deleteMenuItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try { await api.delete(`/menu/${id}`); fetchMenu(); toast.success('Deleted'); } catch { toast.error('Failed'); }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return toast.error('Name and price required');
    try {
      await api.post('/menu', { ...newItem, price: parseFloat(newItem.price) });
      toast.success('Item added!');
      setShowAddMenu(false);
      setNewItem({ name: '', description: '', price: '', category: 'breakfast', image_url: '' });
      fetchMenu();
    } catch { toast.error('Failed to add item'); }
  };

  const sni = (k, v) => setNewItem(f => ({ ...f, [k]: v }));

  if (!isAdmin) return null;

  const STATUS_COLORS = { pending: 'badge-red', confirmed: 'badge-accent', preparing: 'badge-accent', ready: 'badge-green', delivered: 'badge-green', cancelled: 'badge-red' };

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="admin-logo">🍽️ Admin Panel</div>
        <nav className="admin-nav">
          {TABS.map(t => (
            <button key={t} className={`admin-nav-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t === 'Overview' && '📊'} {t === 'Orders' && '🛒'} {t === 'Menu' && '🍛'}
              {t === 'Reservations' && '📅'} {t === 'Users' && '👥'} {t === 'Messages' && '📨'}
              {t}
            </button>
          ))}
        </nav>
        <div className="admin-user-info">
          <div className="admin-avatar">{user?.name[0]}</div>
          <div>
            <p className="admin-name">{user?.name}</p>
            <p className="admin-role">Administrator</p>
          </div>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-topbar">
          <h2>{tab}</h2>
          {tab === 'Menu' && (
            <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }} onClick={() => setShowAddMenu(true)}>
              + Add Item
            </button>
          )}
          {/* Login Logs */}
{tab === 'Login Logs' && (
  <div className="admin-table-wrap">
    {loading ? <div className="loader"><div className="spinner" /></div> : (
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>IP Address</th>
            <th>Device / Browser</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {loginLogs.map(log => (
            <tr key={log.id}>
              <td>#{log.id}</td>
              <td><strong>{log.username || '–'}</strong></td>
              <td>{log.ip_address}</td>
              <td style={{ maxWidth: 250 }}>
                <span style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '12px' }}>
                  {log.device_info}
                </span>
              </td>
              <td>
                <span className={`badge ${log.status === 'success' ? 'badge-green' : 'badge-red'}`}>
                  {log.status === 'success' ? '✅ Success' : '❌ Failed'}
                </span>
              </td>
              <td><small>{new Date(log.login_time).toLocaleString()}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}
        </div>

        {/* Overview */}
        {tab === 'Overview' && stats && (
          <div className="overview-grid">
            <StatCard icon="🛒" label="Total Orders" value={stats.total_orders} color="accent" />
            <StatCard icon="💰" label="Total Revenue" value={`₹${Number(stats.total_revenue).toLocaleString()}`} color="green" />
            <StatCard icon="📅" label="Reservations" value={stats.total_reservations} color="blue" />
            <StatCard icon="👥" label="Customers" value={stats.total_users} color="purple" />
            <StatCard icon="⏳" label="Pending Orders" value={stats.pending_orders} color="orange" />
            <StatCard icon="✅" label="Successful Logins" value={stats.total_logins} color="green" /> 
            <StatCard icon="❌" label="Failed Logins" value={stats.failed_logins} color="red" />   
          </div>
        )}

        {/* Orders */}
        {tab === 'Orders' && (
          <div className="admin-table-wrap">
            {loading ? <div className="loader"><div className="spinner" /></div> : (
              <table className="admin-table">
                <thead><tr><th>#</th><th>Customer</th><th>Items</th><th>Total</th><th>Type</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>#{o.id}</td>
                      <td><strong>{o.customer_name}</strong><br /><small>{o.customer_phone}</small></td>
                      <td>{typeof o.items === 'string' ? JSON.parse(o.items).length : o.items?.length} items</td>
                      <td className="price-cell">₹{o.total_amount}</td>
                      <td><span className="badge badge-accent">{o.order_type}</span></td>
                      <td><span className={`badge ${STATUS_COLORS[o.status]}`}>{o.status}</span></td>
                      <td><small>{new Date(o.created_at).toLocaleDateString()}</small></td>
                      <td>
                        <select value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)} className="status-select">
                          {['pending','confirmed','preparing','ready','delivered','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Menu */}
        {tab === 'Menu' && (
          <>
            {showAddMenu && (
              <div className="modal-overlay" onClick={() => setShowAddMenu(false)}>
                <div className="modal glass-card" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Add Menu Item</h3>
                    <button onClick={() => setShowAddMenu(false)}>✕</button>
                  </div>
                  <form onSubmit={addMenuItem} className="modal-form">
                    <div className="form-group"><label>Name *</label><input value={newItem.name} onChange={e => sni('name', e.target.value)} placeholder="Dish name" required /></div>
                    <div className="form-group"><label>Description</label><textarea rows={2} value={newItem.description} onChange={e => sni('description', e.target.value)} placeholder="Brief description" /></div>
                    <div className="form-row">
                      <div className="form-group"><label>Price (₹) *</label><input type="number" value={newItem.price} onChange={e => sni('price', e.target.value)} placeholder="0.00" required /></div>
                      <div className="form-group"><label>Category</label>
                        <select value={newItem.category} onChange={e => sni('category', e.target.value)}>
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group"><label>Image URL</label><input value={newItem.image_url} onChange={e => sni('image_url', e.target.value)} placeholder="https://..." /></div>
                    <div className="modal-btns">
                      <button type="button" className="btn btn-ghost" onClick={() => setShowAddMenu(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">Add Item</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="admin-table-wrap">
              {loading ? <div className="loader"><div className="spinner" /></div> : (
                <table className="admin-table">
                  <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Available</th><th>Featured</th><th>Actions</th></tr></thead>
                  <tbody>
                    {menu.map(item => (
                      <tr key={item.id}>
                        <td><img src={item.image_url} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} onError={e => e.target.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=60'} /></td>
                        <td><strong>{item.name}</strong></td>
                        <td><span className="badge badge-accent">{item.category}</span></td>
                        <td className="price-cell">₹{item.price}</td>
                        <td><span className={`badge ${item.is_available ? 'badge-green' : 'badge-red'}`}>{item.is_available ? 'Yes' : 'No'}</span></td>
                        <td><span className={`badge ${item.is_featured ? 'badge-accent' : ''}`}>{item.is_featured ? '⭐ Yes' : 'No'}</span></td>
                        <td>
                          <button className="action-btn delete" onClick={() => deleteMenuItem(item.id)}>🗑️ Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Reservations */}
        {tab === 'Reservations' && (
          <div className="admin-table-wrap">
            {loading ? <div className="loader"><div className="spinner" /></div> : (
              <table className="admin-table">
                <thead><tr><th>#</th><th>Guest</th><th>Phone</th><th>Date</th><th>Time</th><th>Guests</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {reservations.map(r => (
                    <tr key={r.id}>
                      <td>#{r.id}</td>
                      <td><strong>{r.name}</strong></td>
                      <td>{r.phone}</td>
                      <td>{new Date(r.date).toLocaleDateString()}</td>
                      <td>{r.time}</td>
                      <td>{r.guests}</td>
                      <td><span className={`badge ${r.status === 'confirmed' ? 'badge-green' : r.status === 'cancelled' ? 'badge-red' : 'badge-accent'}`}>{r.status}</span></td>
                      <td>
                        <select value={r.status} onChange={e => updateReservationStatus(r.id, e.target.value)} className="status-select">
                          {['pending','confirmed','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Users */}
        {tab === 'Users' && (
          <div className="admin-table-wrap">
            {loading ? <div className="loader"><div className="spinner" /></div> : (
              <table className="admin-table">
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>#{u.id}</td>
                      <td><strong>{u.name}</strong></td>
                      <td>{u.email}</td>
                      <td>{u.phone || '–'}</td>
                      <td><span className={`badge ${u.role === 'admin' ? 'badge-accent' : 'badge-green'}`}>{u.role}</span></td>
                      <td>{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Messages */}
        {tab === 'Messages' && (
          <div className="admin-table-wrap">
            {loading ? <div className="loader"><div className="spinner" /></div> : (
              <table className="admin-table">
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m.id}>
                      <td>#{m.id}</td>
                      <td><strong>{m.name}</strong></td>
                      <td>{m.email}</td>
                      <td style={{ maxWidth: 300 }}><span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{m.message}</span></td>
                      <td>{new Date(m.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`stat-card glass-card stat-${color}`}>
      <div className="sc-icon">{icon}</div>
      <div>
        <p className="sc-label">{label}</p>
        <p className="sc-value">{value}</p>
      </div>
    </div>
  );
}
