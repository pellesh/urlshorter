import { useState } from "react";

import { useDispatch } from 'react-redux';
import { addUserLink, clearStatus } from "../../redux/linksReducer.js";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LinkForm = (props) => {
    const [link, setLink] = useState('');
    const [subpart, setSubpart] = useState('');
    const [validLink, setValidlink] = useState(true);

    const dispatch = useDispatch();

    const validateLink = (value) => {
        !value ? setValidlink(false) : setValidlink(true);
    }

    const submit = () => {
        if (!link.length) {
            setValidlink(false);
            return;
        }
        dispatch(clearStatus());
        dispatch(addUserLink({ link, subpart }))
    }

    return <Box
        component="form"
        noValidate
        autoComplete="off"
    >

        <TextField
            error={!validLink}
            required
            id="link"
            onChange={(e) => {
                validateLink(e.target.value);
                setLink(e.target.value)
            }
            }

            label="Required"
            defaultValue={link}
            helperText="original url"
        />

        <TextField
            required
            id="subpart"
            onChange={(e) => setSubpart(e.target.value)}
            defaultValue={subpart}
            helperText="subpart"
        />
        <Button variant="contained" onClick={submit}>Сгенерировать</Button>
    </Box>;
}

export default LinkForm;