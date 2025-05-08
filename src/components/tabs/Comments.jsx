import React, { useEffect } from "react";
import CommentLists from "./CommentLists";
import CreateCommentForm from "./CreateCommentForm";

const Comments = () => {
  return (
    <div className="tab-pane">
      <CreateCommentForm />

      <CommentLists />
    </div>
  );
};

export default Comments;
