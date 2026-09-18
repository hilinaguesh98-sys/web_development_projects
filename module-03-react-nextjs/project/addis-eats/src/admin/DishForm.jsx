import { useState } from 'react';

const emptyDish = { name: '', category: '', price: '', image: '', description: '' };

export default function DishForm({ dish, onSave, onCancel }) {
  const [form, setForm] = useState(dish || emptyDish);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const handleSubmit = (event) => { event.preventDefault(); onSave({ ...form, price: Number(form.price) }); };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{dish ? 'Edit dish' : 'Add dish'}</h2>
      {['name', 'category', 'image', 'description'].map((field) => <div className="field-group" 
      key={field}><label htmlFor={`dish-${field}`}>
        {field[0].toUpperCase() + field.slice(1)}
        </label>{field === 'description' ? 
        <textarea id={`dish-${field}`} 
        rows="3" value={form[field]} onChange={(event) => 
          update(field, event.target.value)} required />
           : <input id={`dish-${field}`} value={form[field]} onChange={(event) => 
        update(field, event.target.value)} required />
        }
      </div>)}
      <div className="field-group"><label htmlFor="dish-price">Price (ETB)</label><input id="dish-price" type="number" min="0" value={form.price} onChange={(event) => update('price', event.target.value)} required /></div>
      <div className="admin-form-actions"><button className="primary-button" type="submit">Save dish</button><button className="secondary-button" type="button" onClick={onCancel}>Cancel</button></div>
    </form>
  );
}