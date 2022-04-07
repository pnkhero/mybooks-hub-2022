import { Dialog, DialogContent, DialogTitle, Fab } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { List, ListSubheader } from '@material-ui/core';
import userTools from './Firebase/Firebase';
import TextField from '@material-ui/core/TextField';
import { useLocation } from "react-router-dom";
import styles from './mystyle.module.css';

export default function UpdateP(props) {
    const {openup, setopenup, email, databook} = props;
    const search1 = useLocation().search;
    const id_user = new URLSearchParams(search1).get('id-user');
    const data = databook.split('|');
    const [search, setMachin] = useState("")
    const [tmp, setmp] = useState("")
    
    const handleClose = () => {
        setopenup(false);
    }

    const onChange = (event) => {
        setMachin(event.target.value)
    };

    const submitnb = () => {
        console.log(databook)
        userTools.remove_bok_now(id_user, databook)
        console.log(data)
        setmp(data[0] + "|" + data[1] + "|" + data[2])
        console.log(tmp)
        if (tmp) {
            var newdata = tmp + "|" + search
            console.log(newdata)
            userTools.add_bok_now(id_user, newdata)
        }
    }

    const finisedbook = () => {
        userTools.remove_bok_now(id_user, databook)
        userTools.add_bok_end(id_user, databook)
    }

    return(
        <Dialog open={openup} onClose={handleClose}>
        <DialogTitle>
            <div>
                {<h1>Update</h1>}
            </div>
        </DialogTitle>
        <DialogContent>
            <div>
                <img src={data[2]}/>
                <div>
                    <TextField
                        onChange={onChange}
                        variant="outlined"
                        label="your nb page"
                        className={styles.upnbchamp}
                        value={search}
                    />
                    <div className={styles.upsubmit}>
                    <Button
                        onClick={() =>submitnb()}
                        variant="contained"
                        color="primary"
                        className="button-submit"
                        value="Submit"
                        >
                            submit
                    </Button>
                    </div>
                    <div className={styles.upfinish}>
                    <Button
                        onClick={() =>finisedbook()}
                        variant="contained"
                        color="primary"
                        className="button-submit"
                        value="Submit"
                        >
                            finished?
                    </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    )
}