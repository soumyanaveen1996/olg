import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Typography, styled } from '@mui/material';

const StyledBox = styled(Box)(({ editorHeight }) => ({
    ".rdw-editor-wrapper": {
        width: "50rem",
        color: "black",
        "& .rdw-editor-toolbar": {
            borderRadius: "6px",
        },
        "& .rdw-editor-main": {
            border: "solid 1px #c4d8ff",
            ...(editorHeight > 60 ? { minHeight: `${editorHeight}px !important`, } : { minHeight: `${60}px !important`, }),
            borderRadius: "6px",
            "&:focus": {
                borderColor: "#638dff",
            },
            "&:hover": {
                borderColor: "#92afff",
            },
            "& .public-DraftStyleDefault-block": {
                margin: "1em !important"
            },
        },
    },
}))




const RichTextInput = ({ editorState, onEditorStateChange, field }) => {

    return (<StyledBox editorHeight={field.height ? field.height : 60}>
        <Typography variant='body1' sx={{ color: "black", fontWeight: "500" }}>{field.title}</Typography>
        <Editor
            editorState={editorState}
            onEditorStateChange={(d) => onEditorStateChange(d, field.maxLength)}
        />
    </StyledBox>)
}

export default RichTextInput;