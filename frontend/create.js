// Generate V-DOC ID on page load
document.addEventListener('DOMContentLoaded', () => {
    const vdocId = 'V-DOC-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('vdocId').value = vdocId;
  });
  