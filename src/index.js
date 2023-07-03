import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {books} from "./data/books";
import {handleRouteChange} from './utils/router';

/* Variables */
const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Find all the navigation links

/* Event Listeners */

// Event listener for loaded content
window.addEventListener('load', () => handleRouteChange(navLinks));
// Event listener for loaded search
window.addEventListener('searchLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    initializeBooks();

    // Event listener for search change
    searchInput.addEventListener('input', handleSearchInput);

});
// Event listener for loaded form
window.addEventListener('formLoaded', () => {
    const form = document.getElementById('book-form');

    // Event listener for form submission
    form.addEventListener('submit', (event) => handleFormSubmit(event, form));
});
// Event listener for loaded overview
window.addEventListener('overviewLoaded', (event) => {
    const {storedBooks, bookId} = event.detail;
    const parsedBooks = JSON.parse(storedBooks);
    const book = parsedBooks.find(b => b.isbn10 === bookId);
    createBookOverview(book)

});

/* Functions */

/* Function to create a new book object */
export function createBookObject(form) {
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

// Function to initialize books 
export function initializeBooks() {
    const storedBooks = localStorage.getItem('books');
    const parsedBooks = storedBooks ? JSON.parse(storedBooks) : books.books;

    // Populate publisher options
    populatePublisherOptions(parsedBooks);

    // Display books
    displayBooks(parsedBooks);

    if (!storedBooks) {
        localStorage.setItem('books', JSON.stringify(parsedBooks));
    }
}

// Function to display books in a grid
export function displayBooks(books) {
    const bookGrid = document.getElementById("bookGrid");
    bookGrid.innerHTML = '';

    // Populate books
    books.forEach((book) => {
        const card = createBookCard(book);
        bookGrid.appendChild(card);
    });
}

// Function to create a book card
export function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
      <div class="card h-100" role="button">
          <img src="images/book.svg" class="card-img-top p-2" alt="${book.title}">
          <div class="card-body d-flex flex-column">
              <h5 class="card-title mb-5">${book.title}</h5>
              <div class="d-flex mt-auto justify-content-between align-items-center">
                <div class="card-text">${book.authors ? book.authors.join(", ") : "Author"}</div>
                <div class="card-text">Pages: ${book.pages ? book.pages : "-"}</div>
              </div>
          </div>
      </div>
    `;

    // Add click event listener to the book card
    card.addEventListener('click', () => {
        // Redirect to the book view page with the selected book isbn
        window.location.href = `book/${book.isbn10}`;
    });

    return card;

}

export function createBookOverview(book) {
    let container = document.createElement('div');
    container.classList.add('container', 'mt-5');

    container.innerHTML = `
        <div class="row gx-5">
            <div class="col-md-4">
                <img src="/images/book.svg" class="book-image" alt="${book.title}">
            </div>
            <div class="col-md-8">
                <h1 id="bookTitle">${book.title}</h1>
                <p id="bookDescription">${book.description}</p>
                <div class="d-flex gap mb-2">
                    <button class="btn btn-outline-primary">Favourite</button>
                    <button class="btn btn-outline-primary">Share</button>
                </div>
                <p id="bookCategories">Category: ${book.categories ? book.categories?.map(tag => `#${tag}`).join(', ') : ""}</p>
                <p>Year: ${book.year ? book.year : ""}</p>
                <p>Number of Pages: ${book.pages ? book.pages : ""}</p>
                <p>Publisher: ${book.publisher ? book.publisher : ""}</p>
                <p>ISBN-10: ${book.isbn10}</p>
                <p>ISBN-13: ${book.isbn13 ? book.isbn13 : ""}</p>
                <button class="btn btn-primary btn-block mt-4 buy-button  mx-auto d-flex justify-content-center">Buy</button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-4">
                <i class="bi bi-pencil-fill"></i>
                <span>${book.authors.join(", ")}</span>
            </div>
        </div>
    `;

    document.getElementById("view-container").appendChild(container);
}

// Function to populate publisher options with unique publishers from books
export function populatePublisherOptions(books) {
    const publisherDropdown = document.getElementById("publisherFilterDropdown");

    // Clear existing options
    publisherDropdown.innerHTML = '';

    // Get unique publishers from books
    const publishers = [...new Set(books.map(book => book.publisher))];

    // Create and append options
    publishers.forEach(publisher => {
        const option = document.createElement('li');
        option.innerHTML = `
            <div class="px-3 py-2">
                <input class="form-check-input" type="checkbox" value="${publisher}">
                <label class="form-check-label">${publisher}</label>
            </div>
        `;
        publisherDropdown.appendChild(option);
    });

    // Event listener for filter change
    const checkboxInputs = document.querySelectorAll('.dropdown-menu input[type="checkbox"]');
    checkboxInputs.forEach(checkbox => {
        checkbox.addEventListener('click', handleFilterChange);
    });
}

// Function to handle form submission 
export function handleFormSubmit(event, form) {
    event.preventDefault();
    const books = JSON.parse(localStorage.getItem('books'));

    const book = createBookObject(form);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    // Reset the form
    form.reset();
}


// Function to handle search input
export function handleSearchInput(event) {
    const searchTerm = event.target.value;
    const books = JSON.parse(localStorage.getItem('books'));
    // Reset the filters
    document.querySelectorAll('.dropdown-menu input[type="checkbox"]').forEach(input => input.checked = false)
    displayBooks(books.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase())));
}


// Function to handle filter change
export function handleFilterChange() {
    const checkboxInputs = document.querySelectorAll('.dropdown-menu input[type="checkbox"]:checked');
    const inputValues = Array.from(checkboxInputs).map(input => input.value);
    const books = JSON.parse(localStorage.getItem('books'));
    // Reset the search 
    document.getElementById('searchInput').value = ""
    if (inputValues.length) {
        displayBooks(books.filter(b => inputValues.includes(b.publisher)));
    }
    else {
        displayBooks(books);
    }
}