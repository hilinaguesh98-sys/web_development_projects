document.addEventListener('DOMContentLoaded', async () => {
  await StorageLayer.initData();
  const params = new URLSearchParams(window.location.search);
  const landlordId = params.get('id');
  const currentUser = StorageLayer.getCurrentUser();

  const isSelf = currentUser && currentUser.role === 'landlord' && (!landlordId || currentUser.id === parseInt(landlordId));
  const activeLandlordId = isSelf ? currentUser.id : parseInt(landlordId);

  const container = document.getElementById('landlord-container');
  if (!container) return;

  const properties = StorageLayer.getProperties().filter(p => p.landlordId === activeLandlordId);
  const users = StorageLayer.getUsers();
  const landlordUser = users.find(u => u.id === activeLandlordId);

  const landlordName = landlordUser ? landlordUser.name : (properties.length > 0 ? properties[0].landlordName : 'Landlord');
  const landlordAvatar = landlordUser?.profilePicture || (properties.length > 0 && (properties[0].landlordAvatar || properties[0].landLordpp?.[0])) || 'https://via.placeholder.com/100?text=Landlord';

  let html = `
    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
      <img src="${landlordAvatar}" alt="${landlordName}" style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);" onerror="this.src='https://via.placeholder.com/90?text=User'">
      <div>
        <h2 style="margin:0;">${landlordName}'s Profile</h2>
        <p style="color:var(--text-muted); margin-top:0.25rem;">Registered Landlord</p>
      </div>
    </div>
    
    <hr style="margin:1.5rem 0; border-color:var(--border-color);">
    
    <h3>Listed Properties (${properties.length})</h3>
    <div class="property-grid" style="margin-top:1rem;">
      ${properties.length > 0 ? properties.map(p => `
        <div class="property-card">
          <div class="card-body">
            <h4>${p.title}</h4>
            <p>${p.price.toLocaleString()} ETB / mo</p>
            <p style="font-size:0.875rem; color:var(--text-muted);">${p.location} - Status: <strong>${p.status}</strong></p>
          </div>
        </div>
      `).join('') : '<p>No listings found.</p>'}
    </div>
  `;

  if (isSelf) {
    const inquiries = StorageLayer.getInquiries().filter(i => i.landlordId === activeLandlordId);
    html += `
      <h3 style="margin-top:3rem;">Received Inquiries (${inquiries.length})</h3>
      <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;">
        ${inquiries.length > 0 ? inquiries.map(i => `
          <div style="background-color:var(--card-bg); padding:1rem; border-radius:8px; border:1px solid var(--border-color);">
            <strong>Renter:</strong> ${i.renterName} (${i.renterPhone})<br>
            <strong>Property:</strong> ${i.propertyTitle}<br>
            <strong>Message:</strong> ${i.message}<br>
            <span style="font-size:0.75rem; color:var(--text-muted);">Preferred Contact: ${i.contactMethod}</span>
          </div>
        `).join('') : '<p>No inquiries received yet.</p>'}
      </div>
    `;
  }

  container.innerHTML = html;
});