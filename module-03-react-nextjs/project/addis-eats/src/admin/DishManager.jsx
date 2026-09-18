import { useEffect, useMemo, useState } from 'react';
import { getDishes } from '../api/dishes';
import DishForm from './DishForm';

export default function DishManager() {
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  useEffect(() => { getDishes().then(setDishes); }, []);
  const visibleDishes = useMemo(() => dishes.filter((dish) => `${dish.name} ${dish.category}`.toLowerCase().includes(search.toLowerCase())), [dishes, search]);
  const persist = (nextDishes) => { setDishes(nextDishes); localStorage.setItem('addisEatsDishes', JSON.stringify(nextDishes)); };
  const saveDish = (dish) => { const next = editing?.id ? dishes.map((item) => item.id === editing.id ? { ...dish, id: editing.id } : item) : [...dishes, { ...dish, id: `dish-${Date.now()}` }]; persist(next); setEditing(null); };
  const deleteDish = (id) => { if (window.confirm('Delete this dish?')) persist(dishes.filter((dish) => dish.id !== id)); };

  return (
    <section className="admin-section">
      <div className="admin-heading"><div><p className="eyebrow"></p><h2>Dishes</h2></div><button className="primary-button" type="button" onClick={() => setEditing({})}>Add dish</button></div>
      {editing && <div className="admin-form-panel"><DishForm key={editing.id || 'new'} dish={editing.id ? editing : null} onSave={saveDish} onCancel={() => setEditing(null)} /></div>}
      <input className="admin-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dishes or categories" aria-label="Search dishes" />
      <div className="admin-table-wrap"><table className="admin-table">
        <thead>
          <tr>
            <th>Dish</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {
              visibleDishes.map((dish) =>
               <tr key={dish.id}><td>{dish.name}
               </td>
               <td>{dish.category}</td>
               <td>{dish.price} ETB</td>
               <td><button className="text-button" type="button" onClick={
                () => setEditing(dish)}>Edit</button>
                <button className="danger-button" type="button" onClick={() => 
                  deleteDish(dish.id)}>Delete</button>
                  </td>
                  </tr>)
                  }</tbody>
                  </table>
                  </div>
    </section>
  );
}