# Making apps error proof  

### Watch video 7 from the following link and answer the following:

1. What do 4XX responses mean? Explain a few of them.
2. What do 5XX responses mean? Explain a few of them.
3. How does try-catch work?
4. What happens when we throw an error?

---

### Deliverable

- Can you change the error message from 'Something went Wrong' to 'Something went wrong ....Retrying'?
- Now, whenever the API fails, retry calling the API again and again at intervals of 5 seconds until it succeeds.
- Put a cancel button to allow the user to stop retrying when desired.

# Answers to the Questions

### 1. What do 4XX responses mean? Explain a few of them.

4XX responses indicate client-side errors. They mean that there is something wrong with the request sent by the client.
- 400 Bad Request: The server cannot process the request due to a client error (e.g., malformed request syntax).
- 401 Unauthorized: The request lacks valid authentication credentials.
- 403 Forbidden: The client is authenticated but does not have permission to access the requested resource.
- 404 Not Found: The requested resource could not be found on the server.

### 2. What do 5XX responses mean? Explain a few of them.

5XX responses indicate server-side errors. They mean that while the request may be correct, the server encountered an error while processing it.
- 500 Internal Server Error: A generic error message indicating that something went wrong on the server.
- 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
- 503 Service Unavailable: The server is currently unable to handle the request, often due to temporary overload or maintenance.
- 504 Gateway Timeout: The server did not receive a timely response from an upstream server while acting as a gateway.

### 3. How does try catch work?

A try-catch block is used for error handling. Code inside the try block is executed normally. If any error occurs during its execution, the control is immediately transferred to the catch block. This prevents the program from crashing and allows you to handle the error gracefully.

### 4. What happens when we throw an error?

When you use throw to generate an error, the normal execution flow is interrupted. The error is propagated up the call stack until it is caught by a catch block. If no catch block handles it, the error can cause the program to crash or lead to unhandled exceptions.

  
