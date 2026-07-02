import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const Teams = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'));
        if (!response.ok) throw new Error('Unable to load teams');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {items.map((team) => (
          <li key={team._id || team.id} className="list-group-item">
            <strong>{team.name}</strong>
            <div className="text-muted">{team.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
