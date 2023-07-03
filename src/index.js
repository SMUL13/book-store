import "./styles.css";
import {handleRouteChange} from './utils/router';

/* Variables */

const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Find all the navigation links
const formContainer = document.getElementById('view-container'); // Parent element that contains the form
let books = []; // Array to store book objects

/* Event Listeners */

// Add event listener for route changes
window.addEventListener('popstate', () => handleRouteChange(navLinks));
window.addEventListener('load', () => handleRouteChange(navLinks));

// Delegate form submission handling to the formContainer
formContainer.addEventListener('submit', (event) => {
    const form = document.getElementById('book-form'); // Book form
    
    if (event.target === form) {
        event.preventDefault();
        const book = createBookObject(form);
        books.push(book);
        form.reset();
    }
});


/* Functions */

/* Function to create a new book object */
function createBookObject(form) {
    const book = {
        title: form.title.value,
        description: form.description.value,
        categories: form.categories.value.split(',').map(category => category.trim()),
        authors: [
            form.author1.value.trim(),
            form.author2.value.trim(),
            form.author3.value.trim()
        ].filter(author => author !== ''),
        publisher: form.publisher.value,
        year: form.year.value,
        pages: form.pages.value,
        isbn10: form.isbn10.value,
        isbn13: form.isbn13.value
    };
    return book;
}