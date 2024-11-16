
// app/api/books/route.js



type Book = {
    id: number;
    title: string;
    author: string;
    price: number;
  };
  
  let books: Book[] = [
    { id: 1, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 9.99 },
    { id: 2, title: "The Intelligent Investor", author: "Benjamin Graham", price: 14.99 },
  ];
  
  // GET handler - Return all books
  export async function GET(): Promise<Response> {
    return new Response(JSON.stringify(books), { status: 200 });
  }
  
  // POST handler - Add a new book
  export async function POST(request: Request): Promise<Response> {
    const body: Partial<Book> = await request.json();
    const newBook: Book = { id: Date.now(), ...body } as Book;  // Ensure id is assigned and type casted
    books.push(newBook);
    return new Response(JSON.stringify(newBook), { status: 201 });
  }
  
  // PUT handler - Update an existing book
  export async function PUT(request: Request): Promise<Response> {
    const body: Partial<Book> = await request.json();
    const { id, title, author, price } = body;
    
    if (typeof id !== 'number') {
      return new Response(JSON.stringify({ error: "Book ID is required" }), { status: 400 });
    }
  
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return new Response(JSON.stringify({ error: "Book not found" }), { status: 404 });
    }
  
    // Update the book details
    books[bookIndex] = { id, title, author, price } as Book;
    return new Response(JSON.stringify(books[bookIndex]), { status: 200 });
  }
  
  // DELETE handler - Delete a book by its id
  export async function DELETE(request: Request): Promise<Response> {
    const body: { id: number } = await request.json();
    const { id } = body;
  
    if (typeof id !== 'number') {
      return new Response(JSON.stringify({ error: "Book ID is required" }), { status: 400 });
    }
  
    books = books.filter((book) => book.id !== id);
    return new Response(JSON.stringify({ message: "Book deleted", id }), { status: 200 });
  }
  

