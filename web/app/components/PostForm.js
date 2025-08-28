'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';
export default function PostForm({ post = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: post?.title || '', body: post?.body || '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      post ? await api.updatePost(post.id, formData) : await api.createPost(formData);
      router.push('/');
      router.refresh();
    } catch (error) {
      alert('Error saving post');
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
      </div>
      <div className="form-group">
        <label>Body</label>
        <textarea value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : post ? 'Update' : 'Create'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Cancel</button>
      </div>
    </form>
  );
}
