import React from "react";
import { useCreatePostMutation, useGetPostsByIdQuery } from "@api/postsApi";

const UploadPage = () => {
  const { data, isLoading } = useGetPostsByIdQuery(2);
  const [createPost, result] = useCreatePostMutation();
  console.log("data", data);
  console.log("result", result);

  const handleCreatePost = () => {
    createPost({ name: "abd", id: 123 });
  };

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <div>this is upload Page</div>
      <button onClick={handleCreatePost}>发布</button>
    </div>
  );
};

export default UploadPage;
