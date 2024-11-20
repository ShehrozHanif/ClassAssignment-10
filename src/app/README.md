# 📂  api/books/route.ts

This folder contains the backend code (API) for managing books. Here, you handle CRUD (Create, Read, Update, Delete) operations.


## Backend (API) in route.ts

Your backend API handles requests from the frontend and manages the books data stored in memory (in the books array). Here’s how each function works:

## a. Data Structure

type Book = {
  id: number;       // Unique ID for each book
  title: string;    // Name of the book
  author: string;   // Author's name
  price: number;    // Price of the book
};

You’ve created an array of books to store data temporarily:

let books: Book[] = [
  { id: 1, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 9.99 },
  { id: 2, title: "The Intelligent Investor", author: "Benjamin Graham", price: 14.99 },
];

Real-world example: Think of books as a collection in a library. Each book has a unique ID, title, author, and price.


---

## b. API Methods

### i. GET Method

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(books), { status: 200 });
}

Purpose: Retrieve all books.




### ii. POST Method

export async function POST(request: Request): Promise<Response> {
  const body: Partial<Book> = await request.json();
  const newBook: Book = { id: Date.now(), ...body } as Book;
  books.push(newBook);
  return new Response(JSON.stringify(newBook), { status: 201 });
}

Purpose: Add a new book to the collection.

Real-world analogy: Adding a new book to the library shelf.

### Key parts:

await request.json() reads the book details sent by the frontend.

Date.now() generates a unique ID for the new book.

The new book is added to the books array.


---

## Code Breakdown:

### 1. Function Signature:

export async function POST(request: Request): Promise<Response>

POST: This function handles HTTP POST requests.

request: Request: The request parameter contains the data sent from the client (e.g., in JSON format).

Promise<Response>: The function returns a Promise that resolves to a Response object (the response sent back to the client).


---

### 2. Extracting the Data:

const body: Partial<Book> = await request.json();

request.json():

This reads the body of the incoming request and converts it into a JavaScript object (parsed from JSON format).

For example, if the client sends:

{
  "title": "New Book",
  "author": "John Doe",
  "price": 19.99
}

Then, body will contain:

{
  title: "New Book",
  author: "John Doe",
  price: 19.99
}


Partial<Book>:

The Partial keyword allows the object to have some or all properties of the Book type.

This is used because the client doesn’t send an id (we generate it later).



---

### 3. Creating the New Book:

const newBook: Book = { id: Date.now(), ...body } as Book;

This line creates a new book object by combining:

id: Date.now():

Generates a unique ID based on the current timestamp (number of milliseconds since January 1, 1970).


...body:

Spreads the properties (e.g., title, author, price) from the body object into the new book.


Example:

If body contains { title: "New Book", author: "John Doe", price: 19.99 }, and Date.now() returns 1690000000000, then newBook will look like:

{
  id: 1690000000000,
  title: "New Book",
  author: "John Doe",
  price: 19.99
}


---

### 4. Adding the New Book to the List:

books.push(newBook);

Adds the newly created book to the books array.

The books array now contains the new book in addition to the previously existing ones.


---

### 5. Sending the Response:

return new Response(JSON.stringify(newBook), { status: 201 });

JSON.stringify(newBook):

Converts the new book object into JSON format (so it can be sent as the response).


status: 201:

HTTP status code 201 means "Created", indicating the new book was successfully added.


Example Response Sent Back to the Client:

{
  "id": 1690000000000,
  "title": "New Book",
  "author": "John Doe",
  "price": 19.99
}





---








## iii. PUT Method

export async function PUT(request: Request): Promise<Response> {
  const body: Partial<Book> = await request.json();
  const { id, title, author, price } = body;
  
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return new Response(JSON.stringify({ error: "Book not found" }), { status: 404 });
  }

  books[bookIndex] = { id, title, author, price } as Book;
  return new Response(JSON.stringify(books[bookIndex]), { status: 200 });
}

Purpose: Update the details of an existing book.

Real-world analogy: Updating the details of a book already in the library.

### Key parts:

The function finds the book in the array using its ID.

If found, the book's details are updated




## iv. DELETE Method

export async function DELETE(request: Request): Promise<Response> {
  const body: { id: number } = await request.json();
  const { id } = body;

  books = books.filter((book) => book.id !== id);
  return new Response(JSON.stringify({ message: "Book deleted", id }), { status: 200 });
}

Purpose: Remove a book from the collection.




