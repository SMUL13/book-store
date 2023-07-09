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
          // Fire event when form is loaded
          dispatchEvent(new Event("formLoaded"))
        })
        .catch(() => viewContainer.innerHTML = '<h1>Failed to load view</h1>');
      break;
    case '/search':
      fetchView('BookSearch.html')
        .then(viewContent => {
          viewContainer.innerHTML = viewContent;
          // Fire event when search is loaded
          dispatchEvent(new Event("searchLoaded"))
        })
        .catch(() => viewContainer.innerHTML = '<h1>Failed to load view</h1>');
      break;
    default:
      const storedBooks = localStorage.getItem('books');
      if (route.match(/^\/book\/\d+$/) && storedBooks) {
        const bookId = route.split('/book/')[1]; // Extract the book id from the route
        // Fire event when overview is loaded and pass the book ID as a custom property of the event
        const event = new CustomEvent('overviewLoaded', {detail: {bookId, storedBooks}});
        dispatchEvent(event)
      } else {
        viewContainer.innerHTML = '<h1>Not Found</h1>';
      }
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
export function handleRouteChange(navLinks) {
  const currentRoute = window.location.pathname;

  // Remove the 'active' class from all links
  navLinks.forEach(link => link.parentElement.classList.remove('active'));

  // Find the link corresponding to the current route and add the 'active' class
  const activeLink = document.querySelector(`.navbar-nav .nav-link[href="${currentRoute}"]`);
  if (activeLink) {
    activeLink.parentElement.classList.add('active');
  }

  renderView(currentRoute);
}

