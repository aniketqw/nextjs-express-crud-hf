import { api } from './lib/api';
import Link from 'next/link';
export default async function HomePage() {
  const posts = await api.getPosts();
  return (
    <div>
      <h1>All Posts</h1>
      <div className="posts-grid">
        {posts.length === 0 ? <p>No posts yet.</p> : posts.map(post => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <div className="meta">Created: {new Date(post.createdAt).toLocaleDateString()}</div>
            <p>{post.body.substring(0, 150)}...</p>
            <div className="actions">
              <Link href={`/posts/${post.id}`} className="btn btn-primary">View</Link>
              <Link href={`/posts/${post.id}/edit`} className="btn btn-secondary">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
