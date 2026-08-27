
document.addEventListener('DOMContentLoaded', async () => {
  await StorageLayer.initData();
  setupTheme();

  if (document.getElementById('property-grid')) {
    initHomePage();
  } else if (document.getElementById('property-detail-container')) {
    initDetailPage();
  } else if (document.getElementById('favorites-grid')) {
    initFavoritesPage();
  }
});

function setupTheme() {
  const currentTheme = StorageLayer.getTheme();
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      const newTheme = isDark ? 'dark' : 'light';
      
      StorageLayer.setTheme(newTheme);
      toggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    });
  }
}

function initHomePage() {
  const grid = document.getElementById('property-grid');
  const searchInput = document.getElementById('search-input');
  const typeFilter = document.getElementById('type-filter');
  const locationFilter = document.getElementById('location-filter');

  function render() {
    grid.innerHTML = '<div class="loading-spinner">Loading properties...</div>';

    let properties = StorageLayer.getProperties().filter(p => p.status === 'approved');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedType = typeFilter ? typeFilter.value : '';
    const selectedLocation = locationFilter ? locationFilter.value : '';

    properties = properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm) || 
                            p.description.toLowerCase().includes(searchTerm) ||
                            p.location.toLowerCase().includes(searchTerm);
      const matchesType = !selectedType || p.type.toLowerCase() === selectedType.toLowerCase();
      const matchesLoc = !selectedLocation || p.location.toLowerCase() === selectedLocation.toLowerCase();
      return matchesSearch && matchesType && matchesLoc;
    });

    if (properties.length === 0) {
      grid.innerHTML = '<div class="empty-state">No properties found matching your criteria.</div>';
      return;
    }

    const favorites = StorageLayer.getFavorites();
    grid.innerHTML = properties.map(p => createPropertyCard(p, favorites.includes(p.id))).join('');
    
    attachFavoriteListeners();
  }

  if (searchInput) searchInput.addEventListener('input', render);
  if (typeFilter) typeFilter.addEventListener('change', render);
  if (locationFilter) locationFilter.addEventListener('change', render);

  render();
}

function createPropertyCard(property, isFav) {
  const imgUrl = property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/300x200';
  const landlordAvatar = property.landlordAvatar || property.landLordpp?.[0] || 'https://via.placeholder.com/40?text=User';
  return `
    <div class="property-card">
      <div class="card-img-container">
        <img src="${imgUrl}" alt="${property.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        ${property.featured ? '<span class="badge-featured">Featured</span>' : ''}
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${property.id}">${isFav ? '❤️' : '🤍'}</button>
      </div>
      <div class="card-body">
        <div class="card-price">${property.price.toLocaleString()} ETB / month</div>
        <h3 class="card-title">${property.title}</h3>
        <div class="card-meta">
          <span>📍 ${property.location}, ${property.city}</span>
          ${property.bedrooms !== undefined ? `<span>🛏️ ${property.bedrooms} Bed</span>` : ''}
          <span>🛁 ${property.bathrooms} Bath</span>
        </div>
        <div class="card-footer">
          <a class="landlord-link" href="landlord-profile.html?id=${property.landlordId}">
            <img src="${landlordAvatar}" alt="${property.landlordName}" onerror="this.src='https://via.placeholder.com/40?text=User'">
            <span>Landlord: ${property.landlordName}</span>
          </a>
          <a href="property-details.html?id=${property.id}" class="btn">View Details</a>
        </div>
      </div>
    </div>
  `;
}

function attachFavoriteListeners() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const updatedFavs = StorageLayer.toggleFavorite(id);
      const isFav = updatedFavs.includes(id);
      btn.classList.toggle('active', isFav);
      btn.textContent = isFav ? '❤️' : '🤍';
    });
  });
}

function initDetailPage() {
  const container = document.getElementById('property-detail-container');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const property = StorageLayer.getPropertyById(id);
  if (!property) {
    container.innerHTML = '<div class="error-state">Property not found.</div>';
    return;
  }

  const imagesHtml = (property.images || []).map(img => 
    `<img src="${img}" alt="${property.title}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">`
  ).join('');

  container.innerHTML = `
    <h2>${property.title}</h2>
    <p style="color:var(--text-muted); margin-bottom: 1rem;">📍 ${property.location}, ${property.city}</p>
    
    <div class="detail-gallery">${imagesHtml}</div>

    <div class="detail-layout">
      <div>
        <h3>Description</h3>
        <p style="margin: 1rem 0;">${property.description}</p>
        
        <h3>Overview</h3>
        <ul style="list-style:none; margin: 1rem 0; display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
          <li><strong>Rent:</strong> ${property.price.toLocaleString()} ETB / month</li>
          <li><strong>Type:</strong> ${property.type}</li>
          ${property.bedrooms !== undefined ? `<li><strong>Bedrooms:</strong> ${property.bedrooms}</li>` : ''}
          <li><strong>Bathrooms:</strong> ${property.bathrooms}</li>
          <li><strong>Landlord:</strong> <a href="landlord-profile.html?id=${property.landlordId}">${property.landlordName}</a></li>
        </ul>
      </div>

      <div style="background-color:var(--card-bg); padding:1.5rem; border-radius:8px; border:1px solid var(--border-color); height:fit-content;">
        <h3>Inquire About Viewing</h3>
        <form id="inquiry-form" style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;">
          <input type="text" id="renter-name" placeholder="Your Full Name" required>
          <input type="tel" id="renter-phone" placeholder="Phone Number " required>
          <select id="contact-method">
            <option value="phone">Phone Call</option>
            <option value="telegram">Telegram</option>
            <option value="email">Email</option>
          </select>
          <textarea id="inquiry-msg" rows="4" placeholder="I am interested in viewing this property..." required></textarea>
          <button type="submit" class="btn" style="background-color: #0b2f5c; color: #ffffff; padding: 12px 28px; font-size: 1rem; font-weight: 600; border: none; border-radius: 6px; cursor: pointer;">Send Inquiry</button>
        </form>
        <div id="inquiry-confirm" style="display:none; color:var(--success); margin-top:1rem; font-weight:bold;">
          Inquiry sent! Estimated viewing availability: Within 24 hours.
        </div>
      </div>
    </div>

    <div style="margin-top: 3rem;">
      <h3>Similar Properties</h3>
      <div class="property-grid" id="similar-grid" style="margin-top:1rem;"></div>
    </div>
  `;

  document.getElementById('inquiry-form').addEventListener('submit', (e) => {
    e.preventDefault();
    StorageLayer.addInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      landlordId: property.landlordId,
      renterName: document.getElementById('renter-name').value,
      renterPhone: document.getElementById('renter-phone').value,
      contactMethod: document.getElementById('contact-method').value,
      message: document.getElementById('inquiry-msg').value
    });
    document.getElementById('inquiry-form').reset();
    document.getElementById('inquiry-confirm').style.display = 'block';
  });

  const similar = StorageLayer.getProperties()
    .filter(p => p.id !== property.id && (p.type === property.type || p.location === property.location))
    .slice(0, 3);
  
  const favs = StorageLayer.getFavorites();
  document.getElementById('similar-grid').innerHTML = similar.length > 0 
    ? similar.map(p => createPropertyCard(p, favs.includes(p.id))).join('')
    : '<p style="color:var(--text-muted)">No similar properties found.</p>';
  
  attachFavoriteListeners();
}

function initFavoritesPage() {
  const grid = document.getElementById('favorites-grid');
  function render() {
    const favIds = StorageLayer.getFavorites();
    const allProps = StorageLayer.getProperties();
    const favProps = allProps.filter(p => favIds.includes(p.id));

    if (favProps.length === 0) {
      grid.innerHTML = '<div class="empty-state">You have no saved favorite properties.</div>';
      return;
    }

    grid.innerHTML = favProps.map(p => createPropertyCard(p, true)).join('');
    
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        StorageLayer.toggleFavorite(id);
        render();
      });
    });
  }
  render();
}