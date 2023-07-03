import {createBookObject} from './index';

// Test createBookObject function
describe('createBookObject', () => {
    test('should create a book object with valid form data', () => {
        // Arrange
        const form = {
            title: {value: 'Book Title'},
            description: {value: 'Book Description'},
            categories: {value: 'Fiction, Mystery'},
            author1: {value: 'Author 1'},
            author2: {value: 'Author 2'},
            author3: {value: 'Author 3'},
            publisher: {value: 'Publisher'},
            year: {value: '2022'},
            pages: {value: '200'},
            isbn10: {value: '1234567890'},
            isbn13: {value: '9781234567890'},
        };

        // Act
        const book = createBookObject(form);

        // Assert
        expect(book).toEqual({
            title: 'Book Title',
            description: 'Book Description',
            categories: ['Fiction', 'Mystery'],
            authors: ['Author 1', 'Author 2', 'Author 3'],
            publisher: 'Publisher',
            year: '2022',
            pages: '200',
            isbn10: '1234567890',
            isbn13: '9781234567890',
        });
    });
});
