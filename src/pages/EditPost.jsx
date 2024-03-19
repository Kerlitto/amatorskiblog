import "../styles/styles.css";
import { Form, Link, redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputArea, TextInputBox } from "../components/textInputContainers";
import { deletePost, editPost, getPost } from "../api/posts";
import { Button } from "../components/buttons";

function EditPostPage() {
  const { users, post } = useLoaderData();
  console.log(post.title);

  return (
    <>
      <div className="title-text-and-button">
        <h1>Edit Post</h1>
        <Form method="delete">
          <Button transparent>REMOVE</Button>
        </Form>
      </div>
      <Form className="form-grid" method="put">
        <div className="title-author-group">
          <TextInputBox
            label="Title"
            type="text"
            name="title"
            defaultValues={post}
          />
          <SelectAuthor users={users} defaultValues={post} />
        </div>
        <TextInputArea
          label="Body"
          type="text"
          name="body"
          defaultValues={post}
        />
        <div className="form-footer-btn-grid">
          <Link to={`..`}>
            <Button transparent>Cancel</Button>
          </Link>
          <Button>Save</Button>
        </div>
      </Form>
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const users = getUsers({ signal });
  const post = getPost(postId, { signal });

  return { users: await users, post: await post };
}

export const editPostPageRoute = {
  loader,
  action: async ({ request, params: { postId } }) => {
    switch (request.method) {
      case "PUT": {
        const formData = await request.formData();
        const title = formData.get("title");
        const userId = formData.get("userId");
        const body = formData.get("body");

        const post = await editPost(
          postId,
          { title, body, userId },
          { signal: request.signal }
        );

        return redirect(`/posts/${post.id}`);
      }
      case "DELETE": {
        const formData = await request.formData();
        const title = formData.get("title");
        const userId = formData.get("userId");
        const body = formData.get("body");

        const post = await deletePost(
          postId,
          { title, body, userId },
          { signal: request.signal }
        );

        return redirect(`/posts/`);
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  },
  element: <EditPostPage />,
};
