## 1. Why should we not connect to a database from the frontend itself? What is the problem?

### Security Exposure:
- If you place database connection details (like credentials or connection strings) in the frontend code, anyone can inspect the network requests or source code to extract those credentials.
- This could allow malicious users to directly query or manipulate your database.

### Lack of Access Control:
- A frontend cannot easily enforce robust authentication and authorization.
- Without a secure backend, any user could potentially request or alter data that they shouldn’t have access to.

### Scalability & Performance Issues:
- Each client directly connecting to the database can overwhelm it with connections.
- A backend server can pool and manage connections more efficiently, caching or batching requests as needed.

### Maintainability & Abstraction:
- Separating the frontend (UI) from the backend (data logic) follows best practices.
- This separation allows each layer (UI vs. business logic) to evolve independently without risking the other.

## 2. What is the ideal way to connect to databases?

### Use a Dedicated Backend (Server) Layer:
- Typically built using Node.js, Python (Django/Flask), Ruby (Rails), Java (Spring), etc.
- The server has secure, private access to the database and exposes an API (REST, GraphQL, etc.) for the frontend to consume.

### Benefits of a Backend:
- **Security:** Keeps credentials hidden on the server side.
- **Centralized Logic:** Handles validations, authentication, and authorization in one place.
- **Optimized Database Connections:** Manages connection pooling, caching, and can scale horizontally if needed.
- **Consistent Data Format:** The server can structure and sanitize data before sending it to the client, ensuring a consistent API.

## 3. What is the default method type of the Fetch API—GET or POST?
- The default HTTP method for the Fetch API is **GET**.
- If you don’t specify any options in your `fetch(url, options)`, it automatically uses **GET**.

## 4. When I do `fetch('https://swapi.dev/api/films')`, what is the default method type here?
- Since no method is specified, it defaults to **GET**.
- This means you’re making a **GET request** to `https://swapi.dev/api/films`.

## 5. What is JSON? Why do we do `response.json()`?

### JSON (JavaScript Object Notation):
- A lightweight data-interchange format.
- Easy for humans to read/write and for machines to parse/generate.
- Commonly used for transmitting data in web applications (e.g., between client and server).

### Why `response.json()`?
- When you use the Fetch API, the initial response is a `Response` object containing the raw response body.
- Calling `response.json()` parses the raw body text (which is typically in JSON format) and converts it into a JavaScript object.
- This makes it easy to access and manipulate the data (e.g., `data.results`, `data.title`, etc.).

## 6. What does `fetch()` return? Why do we need to use `.then()`?

### Return Value:
- `fetch()` returns a **Promise** that resolves to a `Response` object once the network request completes.

### Why `.then()`?
- Promises represent **asynchronous operations**.
- `.then()` is a method used to handle the successful resolution of the promise, giving you access to the resolved data (the `Response` object).
- Alternatively, you can use `async/await` to handle the promise more succinctly.

## 7. Why can’t we simply write `const response = fetch(url)`?

### Asynchronous Nature:
- `fetch(url)` returns a **promise** immediately, but the actual data won’t be available until the request completes.
- If you do `const response = fetch(url)`, `response` is just the **promise placeholder**, not the final data.

### How to Properly Handle It:
- You must either use `.then()` or `async/await` to wait for the promise to resolve:

#### Using `.then()`:
```js
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Work with the data here
  });
```

#### Using `async/await`:
```js
const response = await fetch(url);
const data = await response.json();
// Work with the data here
```

