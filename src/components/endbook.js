import { Dialog, DialogContent, DialogTitle, Fab } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { List, ListSubheader } from '@material-ui/core';
import userTools from './Firebase/Firebase'
import { useLocation } from "react-router-dom";
import styles from './mystyle.module.css';

export default function EndbookP(props) {
    const { selectWP, setselectWP, email, databook} = props;
    const search1 = useLocation().search;
    const id_user = new URLSearchParams(search1).get('id-user');
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        setselectWP(false);
    }

    return (
        <Dialog open={selectWP} onClose={handleClose}>
            <DialogTitle>
                <div>
                    {<h1>My finished book list</h1>}
                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                {selectWP === true && (
                    <List subheader={<ListSubheader> Books </ListSubheader>}>
                        {databook["endedbook"].map((databook => { 
                            // <p>{databook}</p>
                            var data = databook.split('|');
                            var bookName = data[0];
                            var authorName= data[1];
                            var link = data[2];

                            return ( 
                            <div>
                                <p className={styles.wishlistit}>{bookName}</p>
                                <p className={styles.wishlistaut}>{authorName}</p>
                                <img src={link}/>
                            </div>
                            )
                        }
                    ))
                }
                    </List>
                )}
                </div>
            </DialogContent>
        
        </Dialog>
    )
}