## Solution:
For Code go to `src` folder.

## Other Additional Question Solution:

### Q1: What is the problem with using `<a href="...">` (anchor tags) in React?
   **A:** Using anchor tags (`<a href="...">`) causes a full page reload, which:
   - Reloads the entire React app, losing all state.
   - Slows down navigation because the browser re-fetches everything.
   - Breaks the concept of a Single Page Application (SPA).

### Q2: How does `<Link>` solve the issue of anchor tags?
   **A:** `<Link>` from React Router provides client-side navigation, meaning:
   - It updates the URL without reloading the page.
   - The app remains interactive and keeps its state.
   - Navigation is much faster and smoother.

   **Example:**
   ```jsx
   <Link to="/about">Go to About Page</Link>
   ```

### Q3: Why do we use `<NavLink>`? Why is it better than `<Link>`?
   **A:** `<NavLink>` is a special version of `<Link>` that:
   - Adds an "active" class automatically to the currently active link.
   - Helps in styling navigation menus dynamically.
   - Allows conditional styling based on whether the link is active.

   **Example:**
   ```jsx
   <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>
     About
   </NavLink>
   ```
   This makes it easy to highlight the active page dynamically.
