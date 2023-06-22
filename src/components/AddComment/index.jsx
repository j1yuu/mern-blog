import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import axios from "../../axios"
import { useForm } from "react-hook-form";

export const Index = ({ postId }) => {
  const UserData = useSelector((state) => state.auth.data);
  const [text, setText] = React.useState();


  const onSubmit = async (e) => {
    const data = {
      comment: text,
      userId: UserData._id
    }

    await axios.patch(`/posts/${postId}/comment`, data).then(res => console.log(res)).catch(err => console.warn(err));
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <form>
            <TextField
              label="Написать комментарий"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              value={text}
              onChange={e => setText(e.target.value)}
              type="text"
            />
            <Button disabled={!Boolean(text)} onClick={onSubmit} variant="contained" type='submit'>Отправить</Button>
          </form>
        </div>
      </div>
    </>
  );
};
