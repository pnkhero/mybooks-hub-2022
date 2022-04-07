import { Dialog, DialogContent, DialogTitle, Fab } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import { List, ListSubheader } from '@material-ui/core';
import userTools from './Firebase/Firebase'
import { useLocation } from "react-router-dom";
import styles from './mystyle.module.css';

export default function WishP(props) {
    const {openPopup, setOpenPopup, email, databook} = props;
    const search1 = useLocation().search;
    const id_user = new URLSearchParams(search1).get('id-user');
    
    const handleClose = () => {
        setOpenPopup(false);
    }

    const startbo = (str) => {
        userTools.add_bok_now(id_user, str)
        userTools.remove_bok_wish(id_user, str)
    }
    
    return (
        <Dialog open={openPopup} onClose={handleClose} maxWidth="sm">
            <DialogTitle>
                <div>
                    {<h1>My wish list</h1>}
                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                {openPopup === true && (
                    <List subheader={<ListSubheader> Books </ListSubheader>}>
                        {databook["wishlist"].map((databook => { 
                            
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
                                <Button
                                    onClick={() => startbo(databook)}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="button-submit"
                                    value="Submit"
                                >
                                    start
                                </Button>
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