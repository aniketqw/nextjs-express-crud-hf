import './globals.css';
export const metadata = { title: 'CRUD App', description: 'Next.js SSR CRUD' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="container">
            <a href="/" className="logo">CRUD App</a>
            <div className="nav-links">
              <a href="/">Posts</a>
              <a href="/posts/new">New Post</a>
            </div>
          </div>
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
