import React, { useState, useEffect } from 'react'
import useStyles from './form.styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => currentId ? state.posts.find((item) => item._id === currentId) : null);
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === null) {

            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        } else {
            console.log("else called")
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();

        }
    };

    const clear = () => {
        setCurrentId(null)
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='6' algin="center">
                    please sign in to create your own memories and like other's memories
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{`${currentId ? 'Editing a Memory' : 'Creating a Memory'}`}</Typography>
                {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="container" color="primary" size="large" type="submit" fullWidth> submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth> clear</Button>
            </form>
        </Paper>
    )
}

export default Form