import { generateUserCredentials } from '../framework/fixtures/userFixture.js';
import { createUser } from '../framework/services/authService.js';
import { createBook, getBookByISBN } from '../framework/services/bookService.js';

describe('Book creation tests', () => {
  let creds;
  let userId;

  beforeAll(async () => {
    creds = generateUserCredentials();
    const username = creds.username;
    const password = creds.password;

    const userResponse = await createUser({ userName: username, password: password });
    userId = userResponse.data.userID;
  });

  describe('Book creation tests', () => {
    it('should successfully create a book for the user', async () => {
      const response = await createBook({
        userId,
        collectionOfIsbns: [{ isbn: '9781449331818' }],
        username: creds.username,
        password: creds.password
      });

      expect(response.status).toBe(201);
      expect(response.data.books).toBeDefined();
      expect(response.data.books.length).toBeGreaterThan(0);
      expect(response.data.books[0].isbn).toBe('9781449331818');
    });

    it('should return an error when creating a book with invalid ISBN', async () => {
      const response = await createBook({
        userId,
        collectionOfIsbns: [{ isbn: 'invalid_isbn' }],
        username: creds.username,
        password: creds.password
      });

      expect(response.status).toBe(400);
      expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!');
    });

    it('should return an error when creating a book without authorization', async () => {
      const response = await createBook({
        userId,
        collectionOfIsbns: [{ isbn: '9781449331818' }],
        username: creds.username,
        password: 'invalid_password'
      });

      expect(response.status).toBe(401);
      expect(response.data.message).toBe('User not authorized!');
    });
  });

  describe('Receive books by ISBN tests', () => {
    it('should successfully return book details for a valid ISBN', async () => {
      const isbn = '9781449331818';
      const response = await getBookByISBN(isbn);

      expect(response.status).toBe(200);
      expect(response.data.isbn).toBe(isbn);
      expect(response.data.title).toBe('Learning JavaScript Design Patterns');
      expect(response.data.author).toBe('Addy Osmani');
    });

    it('should return an error for an invalid ISBN', async () => {
      const isbn = 'invalid_isbn';
      const response = await getBookByISBN(isbn);

      expect(response.status).toBe(400);
      expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!');
    });

    it('should return an error when ISBN is missing', async () => {
      const response = await getBookByISBN('');

      expect(response.status).toBe(400);
      expect(response.data.message).toBe('ISBN supplied is not available in Books Collection!');
    });
  });
});