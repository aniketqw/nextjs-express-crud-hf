import { api } from '../../../lib/api';
import PostForm from '../../../components/PostForm';
export default async function EditPage({ params }) {
  const post = await api.getPost(params.id);
  return <div><h1>Edit Post</h1><PostForm post={post} /></div>;
}
