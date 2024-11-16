"use client";

import { useState, useEffect } from "react";

// Define types for the Book object
type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]); // Type the books state as an array of Book
  const [title, setTitle] = useState<string>(""); // Type the title state as string
  const [author, setAuthor] = useState<string>(""); // Type the author state as string
  const [price, setPrice] = useState<string>(""); // Type the price state as string (since input is text)
  const [editId, setEditId] = useState<number | null>(null); // Allow editId to be number or null
  const [error, setError] = useState<string>(""); // Type the error state as string

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Validate inputs before submitting
  const validateInputs = (): boolean => {
    if (!title || !author || !price) {
      setError("Please fill in all fields: Title, Author, and Price.");
      return false;
    }
    setError(""); // Clear error if all fields are filled
    return true;
  };

  // Add a new book
  const addBook = () => {
    if (!validateInputs()) return; // Only proceed if inputs are valid

    fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, price: parseFloat(price) }), // Send price as a number
    })
      .then((res) => res.json())
      .then((newBook: Book) => {
        setBooks([...books, newBook]);
        setTitle("");
        setAuthor("");
        setPrice(""); // Reset price
      });
  };

  // Update an existing book
  const updateBook = () => {
    if (!validateInputs()) return; // Only proceed if inputs are valid

    fetch("/api/books", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, title, author, price: parseFloat(price) }), // Send price as a number
    })
      .then((res) => res.json())
      .then((updatedBook: Book) => {
        setBooks(
          books.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          )
        );
        setEditId(null);
        setTitle("");
        setAuthor("");
        setPrice(""); // Reset price
      });
  };

  // Delete a book
  const deleteBook = (id: number) => {
    fetch("/api/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(() => {
      setBooks(books.filter((book) => book.id !== id));
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Books Inventory</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form to Add/Edit Books */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Title"
          className="border rounded p-2 w-full sm:w-1/3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="border rounded p-2 w-full sm:w-1/3"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="border rounded p-2 w-full sm:w-1/3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {editId ? (
          <button
            onClick={updateBook}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 sm:mt-0 sm:w-1/4"
          >
            Update Book
          </button>
        ) : (
          <button
            onClick={addBook}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 sm:mt-0 sm:w-1/4"
          >
            Add Book
          </button>
        )}
      </div>

      {/* Display List of Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded p-4 shadow-md flex flex-col gap-4"
          >
            <div>
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-gray-800 font-semibold">${book.price}</p> {/* Display Price */}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setEditId(book.id);
                  setTitle(book.title);
                  setAuthor(book.author);
                  setPrice(book.price.toString()); // Set price for editing, ensure it's a string
                }}
                className="bg-yellow-500 text-white px-3 py-2 rounded w-full sm:w-auto"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="bg-red-500 text-white px-3 py-2 rounded w-full sm:w-auto"
              >
                Delete
              </button>
              <button className="bg-indigo-500 text-white px-3 py-2 rounded w-full sm:w-auto">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
















// "use client";

// import { useState, useEffect } from "react";

// // Define types for the Book object
// type Book = {
//   id: number;
//   title: string;
//   author: string;
//   price: number;
// };

// export default function BooksPage() {
//   const [books, setBooks] = useState<Book[]>([]); // Type the books state as an array of Book
//   const [title, setTitle] = useState<string>(""); // Type the title state as string
//   const [author, setAuthor] = useState<string>(""); // Type the author state as string
//   const [price, setPrice] = useState<string>(""); // Type the price state as string (since input is text)
//   const [editId, setEditId] = useState<number | null>(null); // Allow editId to be number or null
//   const [error, setError] = useState<string>(""); // Type the error state as string

//   useEffect(() => {
//     fetch("/api/books")
//       .then((res) => res.json())
//       .then((data) => setBooks(data));
//   }, []);

//   // Validate inputs before submitting
//   const validateInputs = (): boolean => {
//     if (!title || !author || !price) {
//       setError("Please fill in all fields: Title, Author, and Price.");
//       return false;
//     }
//     setError(""); // Clear error if all fields are filled
//     return true;
//   };

//   // Add a new book
//   const addBook = () => {
//     if (!validateInputs()) return; // Only proceed if inputs are valid

//     fetch("/api/books", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, author, price: parseFloat(price) }), // Send price as a number
//     })
//       .then((res) => res.json())
//       .then((newBook: Book) => {
//         setBooks([...books, newBook]);
//         setTitle("");
//         setAuthor("");
//         setPrice(""); // Reset price
//       });
//   };

//   // Update an existing book
//   const updateBook = () => {
//     if (!validateInputs()) return; // Only proceed if inputs are valid

//     fetch("/api/books", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id: editId, title, author, price: parseFloat(price) }), // Send price as a number
//     })
//       .then((res) => res.json())
//       .then((updatedBook: Book) => {
//         setBooks(
//           books.map((book) =>
//             book.id === updatedBook.id ? updatedBook : book
//           )
//         );
//         setEditId(null);
//         setTitle("");
//         setAuthor("");
//         setPrice(""); // Reset price
//       });
//   };

//   // Delete a book
//   const deleteBook = (id: number) => {
//     fetch("/api/books", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     }).then(() => {
//       setBooks(books.filter((book) => book.id !== id));
//     });
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Books Inventory</h1>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       {/* Form to Add/Edit Books */}
//       <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Title"
//           className="border rounded p-2 w-full md:w-1/3"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           className="border rounded p-2 w-full md:w-1/3"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           className="border rounded p-2 w-full md:w-1/3"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         {editId ? (
//           <button
//             onClick={updateBook}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Update Book
//           </button>
//         ) : (
//           <button
//             onClick={addBook}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Add Book
//           </button>
//         )}
//       </div>

//       {/* Display List of Books */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {books.map((book) => (
//           <div
//             key={book.id}
//             className="border rounded p-4 shadow-md flex flex-col gap-4"
//           >
//             <div>
//               <h2 className="text-xl font-bold">{book.title}</h2>
//               <p className="text-gray-600">by {book.author}</p>
//               <p className="text-gray-800 font-semibold">${book.price}</p> {/* Display Price */}
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => {
//                   setEditId(book.id);
//                   setTitle(book.title);
//                   setAuthor(book.author);
//                   setPrice(book.price.toString()); // Set price for editing, ensure it's a string
//                 }}
//                 className="bg-yellow-500 text-white px-3 py-2 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteBook(book.id)}
//                 className="bg-red-500 text-white px-3 py-2 rounded"
//               >
//                 Delete
//               </button>
//               <button className="bg-indigo-500 text-white px-3 py-2 rounded">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
