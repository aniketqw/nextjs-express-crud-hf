'use client';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';
export default function DeleteButton({ postId }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    try {
      await api.deletePost(postId);
      router.push('/');
      router.refresh();
    } catch (error) {
      alert('Error deleting post');
    }
  };
  return <button onClick={handleDelete} className="btn btn-danger">Delete</button>;
}
