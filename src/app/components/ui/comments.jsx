import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddComment } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    deleteComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const handleSubmit = (data) => {
        dispatch(createComment(data));
    };
    const handleRemoveComment = (id) => {
        dispatch(deleteComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddComment
                        onSubmit={handleSubmit}
                        userId={userId}
                        currentUserId={currentUserId}
                    />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading ? (
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    ) : (
                        "Loading"
                    )}
                </div>
            </div>
        </>
    );
};
export default Comments;
