import { api } from '../../lib/api';
import Link from 'next/link';
import DeleteButton from '../../components/DeleteButton';
export default async function PostPage({ params }) {
  const post = await api.getPost(params.id);
  return (
    <div>
      <h1>{post.title}</h1>
      <div className="meta">
        <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
      </div>
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.body}</p>
      </div>
      <div className="actions">
        <Link href="/" className="btn btn-secondary">Back</Link>
        <Link href={`/posts/${post.id}/edit`} className="btn btn-primary">Edit</Link>
        <DeleteButton postId={post.id} />
      </div>
    </div>
  );
}
