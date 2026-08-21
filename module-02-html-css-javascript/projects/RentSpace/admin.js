document.addEventListener('DOMContentLoaded', async () => {
  await StorageLayer.initData();

  if (document.getElementById('admin-dashboard') && !StorageLayer.isAdminLoggedIn()) {
    window.location.href = 'admin-login.html';
    return;
  }

  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('username').value;
      const pass = document.getElementById('password').value;
      if (user === 'hilina' && pass === '12345') {
        StorageLayer.setAdminLoggedIn(true);
        window.location.href = 'admin.html';
      } else {
        alert('Invalid Admin Credentials');
      }
    });
  }

  if (document.getElementById('admin-dashboard')) {
    initAdminDashboard();
  }
});

function initAdminDashboard() {
  renderAnalytics();
  showSection('properties-section');

  document.getElementById('logout-btn').addEventListener('click', () => {
    StorageLayer.setAdminLoggedIn(false);
    window.location.href = 'admin-login.html';
  });

  document.getElementById('add-prop-btn').addEventListener('click', () => {
    openPropertyModal();
  });
}

function renderAnalytics() {
  const props = StorageLayer.getProperties();
  const inquiries = StorageLayer.getInquiries();
  const users = StorageLayer.getUsers();

  const totalProps = props.length;
  const approved = props.filter(p => p.status === 'approved').length;
  const featured = props.filter(p => p.featured).length;
  const avgRent = totalProps ? Math.round(props.reduce((acc, p) => acc + p.price, 0) / totalProps) : 0;

  document.getElementById('analytics-container').innerHTML = `
    <div class="stat-card"><h3>${totalProps}</h3><p>Total Properties</p></div>
    <div class="stat-card"><h3>${approved}</h3><p>Approved Listings</p></div>
    <div class="stat-card"><h3>${featured}</h3><p>Featured Listings</p></div>
    <div class="stat-card"><h3>${inquiries.length}</h3><p>Total Inquiries</p></div>

  `;
}

function renderAdminProperties() {
  const props = StorageLayer.getProperties();
  const tbody = document.getElementById('admin-props-tbody');

  tbody.innerHTML = props.map(p => `
    <tr>
      <td>${p.id}</td>
      <td>${p.title}</td>
      <td>${p.type}</td>
      <td>${p.location}</td>
      <td>${p.price.toLocaleString()} ETB</td>
      <td><span style="color:${p.status === 'approved' ? 'green' : 'orange'}">${p.status}</span></td>
      <td>${p.featured ? '⭐ Yes' : 'No'}</td>
      <td>
        <button onclick="toggleApprove(${p.id})">${p.status === 'approved' ? 'Reject' : 'Approve'}</button>
        <button onclick="toggleFeature(${p.id})">Feature</button>
        <button onclick="deleteProp(${p.id})" style="color:red;">Delete</button>
      </td>
    </tr>
  `).join('');
}

window.toggleApprove = function(id) {
  const props = StorageLayer.getProperties();
  const idx = props.findIndex(p => p.id === id);
  if (idx !== -1) {
    props[idx].status = props[idx].status === 'approved' ? 'rejected' : 'approved';
    StorageLayer.saveProperties(props);
    renderAdminProperties();
    renderAnalytics();
  }
};

window.toggleFeature = function(id) {
  const props = StorageLayer.getProperties();
  const idx = props.findIndex(p => p.id === id);
  if (idx !== -1) {
    props[idx].featured = !props[idx].featured;
    StorageLayer.saveProperties(props);
    renderAdminProperties();
    renderAnalytics();
  }
};

window.deleteProp = function(id) {
  if (confirm('Are you sure you want to delete this property?')) {
    let props = StorageLayer.getProperties();
    props = props.filter(p => p.id !== id);
    StorageLayer.saveProperties(props);
    renderAdminProperties();
    renderAnalytics();
  }
};

function openPropertyModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Add New Property</h3>
      <form id="add-property-form" style="display:flex; flex-direction:column; gap:0.75rem; margin-top:1rem;">
        <input type="text" id="prop-title" placeholder="Title" required>
        <select id="prop-type" required>
          <option value="villa">Villa</option>
          <option value="apartment">Apartment</option>
          <option value="studio apartment">Studio Apartment</option>
        </select>
        <input type="text" id="prop-location" placeholder="Location (e.g. Bole)" required>
        <input type="number" id="prop-price" placeholder="Rent (ETB)" required>
        <input type="number" id="prop-bedrooms" placeholder="Bedrooms (0 for Studio)" required>
        <input type="number" id="prop-bathrooms" placeholder="Bathrooms" required>
        <input type="text" id="prop-landlord" placeholder="Landlord Name" required>
        <textarea id="prop-desc" placeholder="Description" required></textarea>
        <input type="text" id="prop-images" placeholder="Image Paths (comma separated)" value="images/properties/sample.jpg">
        <div style="display:flex; gap:1rem; margin-top:1rem;">
          <button type="submit" class="btn" style="background-color: #1dc23b; color: #ffffff; padding: 12px 28px; font-size: 1rem; font-weight: 600; border: none; border-radius: 6px; cursor: pointer;">Save Property</button>
          <button type="button" class="btn btn-secondary"   style="background-color: #9c2626; color: #ffffff; padding: 12px 28px; font-size: 1rem; font-weight: 600; border: none; border-radius: 6px; cursor: pointer;" onclick="this.closest('.modal-backdrop').remove()">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('add-property-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const props = StorageLayer.getProperties();
    const newProp = {
      id: Date.now(),
      title: document.getElementById('prop-title').value,
      type: document.getElementById('prop-type').value,
      location: document.getElementById('prop-location').value,
      city: 'Addis Ababa',
      price: parseFloat(document.getElementById('prop-price').value),
      bedrooms: parseInt(document.getElementById('prop-bedrooms').value),
      bathrooms: parseInt(document.getElementById('prop-bathrooms').value),
      description: document.getElementById('prop-desc').value,
      status: 'approved',
      featured: false,
      landlordId: Date.now(),
      landlordName: document.getElementById('prop-landlord').value,
      images: document.getElementById('prop-images').value.split(',').map(s => s.trim())
    };

    props.push(newProp);
    StorageLayer.saveProperties(props);
    modal.remove();
    renderAdminProperties();
    renderAnalytics();
  });
}

function showSection(sectionId) {
  if (sectionId === 'properties-section') {
    renderAdminProperties();
  }
}