function showContent(section) {
  const content = document.getElementById('content');
  
  switch(section) {
      case 'intro':
          content.innerHTML = `
              <h1>Introduction</h1>
              <p>This is the introduction section of the website. Here, you can find an overview of what this site is about.</p>
          `;
          break;
      case 'contacts':
          content.innerHTML = `
              <h1>Contact Information</h1>
              <p>You can reach us at:</p>
              <ul>
                  <li>Email: contact@example.com</li>
                  <li>Phone: +123456789</li>
                  <li>Address: 123 Main Street, Anytown, USA</li>
              </ul>
          `;
          break;
      case 'blog':
          content.innerHTML = `
              <h1>Blog</h1>
              <p>Welcome to our blog! Here you'll find the latest updates and articles.</p>
              <ul>
                  <li><a href="#">Blog Post 1</a></li>
                  <li><a href="#">Blog Post 2</a></li>
                  <li><a href="#">Blog Post 3</a></li>
              </ul>
          `;
          break;
      default:
          content.innerHTML = `
              <h1>Welcome to My Website</h1>
              <p>Select a button to see more content.</p>
          `;
  }
}

// JavaScript function to toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-250px';
    } else {
        sidebar.style.right = '0px';
    }
}