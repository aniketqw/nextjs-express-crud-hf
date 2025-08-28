const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
class ApiClient {
  async fetch(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers }
    };
    const res = await fetch(url, config);
    if (!res.ok && res.status !== 204) throw new Error(`API Error: ${res.status}`);
    return res.status === 204 ? null : res.json();
  }
  async getPosts() { return this.fetch('/api/posts'); }
  async getPost(id) { return this.fetch(`/api/posts/${id}`); }
  async createPost(data) { return this.fetch('/api/posts', { method: 'POST', body: JSON.stringify(data) }); }
  async updatePost(id, data) { return this.fetch(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
  async deletePost(id) { return this.fetch(`/api/posts/${id}`, { method: 'DELETE' }); }
}
export const api = new ApiClient();
