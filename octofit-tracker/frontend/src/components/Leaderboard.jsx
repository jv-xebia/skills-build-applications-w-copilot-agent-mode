import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const Leaderboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard/'));
        if (!response.ok) throw new Error('Unable to load leaderboard');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((entry) => (
          <li key={entry._id || entry.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{entry.name}</strong>
              <div className="text-muted">{entry.team}</div>
            </span>
            <span className="badge bg-primary rounded-pill">{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
