import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const Users = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('users/'));
        if (!response.ok) throw new Error('Unable to load users');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((user) => (
          <li key={user._id || user.id} className="list-group-item">
            <strong>{user.name}</strong>
            <div className="text-muted">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
