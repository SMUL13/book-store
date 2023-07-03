// router.js
export function renderView(route) {
  const viewContainer = document.getElementById('view-container');

  switch (route) {
    case '/':
      viewContainer.innerHTML = "";
      break;
    case '/book':
      fetchView('BookAdd.html')
        .then(viewContent => {
          viewContainer.innerHTML = viewContent;
        })
        .catch(() => viewContainer.innerHTML = '<h1>Failed to load view</h1>');
      break;
    case '/search':
      fetchView('contact.html')
        .then(viewContent => {
          viewContainer.innerHTML = viewContent;
        })
        .catch(() => viewContainer.innerHTML = '<h1>Failed to load view</h1>');
      break;
    default:
      viewContainer.innerHTML = '<h1>Not Found</h1>';
      break;
  }
}

// Fetch each html based on the path
export function fetchView(viewPath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const absolutePath = `${window.location.origin}/${viewPath}`;

    xhr.open('GET', absolutePath);

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject();
      }
    };

    xhr.onerror = () => reject();
    xhr.send();
  });
}

// Handle route change
export function handleRouteChange(navLinks, route) {
  const currentRoute = route || window.location.pathname;

  // Remove the 'active' class from all links
  navLinks.forEach(link => link.parentElement.classList.remove('active'));

  // Find the link corresponding to the current route and add the 'active' class
  const activeLink = document.querySelector(`.navbar-nav .nav-link[href="${currentRoute}"]`);
  if (activeLink) {
    activeLink.parentElement.classList.add('active');
  }

  // Update the URL without page reload
  history.pushState(null, null, currentRoute);

  renderView(currentRoute);
}
