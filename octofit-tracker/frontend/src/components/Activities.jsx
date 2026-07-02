import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const Activities = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/activities/'));
        if (!response.ok) throw new Error('Unable to load activities');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((activity) => (
          <li key={activity._id || activity.id} className="list-group-item">
            <strong>{activity.type}</strong>
            <div className="text-muted">{activity.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
