import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const Workouts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('workouts/'));
        if (!response.ok) throw new Error('Unable to load workouts');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((workout) => (
          <li key={workout._id || workout.id} className="list-group-item">
            <strong>{workout.name}</strong>
            <div className="text-muted">{workout.focus}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
