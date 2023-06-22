import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import axios from '../axios'

import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchComments, fetchTags } from "../redux/slices/posts";
import { useParams } from "react-router-dom";

export const TagFilteredPage = () => {
    const dispatch = useDispatch();
    const { name } = useParams()
    const UserData = useSelector((state) => state.auth.data);
    const { tags, comments } = useSelector((state) => state.posts);
    const [tagPosts, setTagPosts] = React.useState();
    const isPostsLoading = Boolean(!tagPosts);
    const isTagsLoading = tags.status === 'loading';
    const isCommentsLoading = comments.status === 'loading';

    React.useEffect(() => {
        console.log(name)
        axios.get(`/tags/${name}`).then(res => setTagPosts(res.data))
        dispatch(fetchTags());
        dispatch(fetchComments());
    }, [name])

    return (
        <>
            <h1>
                {`#${name}`}
            </h1>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostsLoading ? [...Array(5)] : tagPosts).map((obj, index) =>
                        isPostsLoading ? (<Post key={index} isLoading={true}></Post>) : (
                            <Post
                                key={index}
                                id={obj._id}
                                title={obj.title}
                                imageUrl={obj.imageURL}
                                user={obj.user}
                                createdAt={obj.createdAt}
                                viewsCount={obj.viewsCount}
                                commentsCount={obj.comments.length}
                                tags={obj.tags}
                                comments={obj.comments}
                                isEditable={UserData?._id === obj.user._id}
                            />
                        ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock
                        items={tags.items}
                        isLoading={isTagsLoading}
                    />
                    <CommentsBlock
                        items={comments.items}
                        isLoading={isCommentsLoading}
                    />
                </Grid>
            </Grid>
        </>
    );
};
