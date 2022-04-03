import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";
import WishP from "./wishlist";
import EndbookP from "./endbook"
import UpdateP from "./updatepop"
import userTools from './Firebase/Firebase'
import styles from './mystyle.module.css';
import { render } from '@testing-library/react';


const submit = {
    position: 'relative',
    marginTop: '30vh',
    height: '8vh',
    width: '8vh',
}

const AddWidght = {
    position: 'relative',
    marginTop: '5vh',
    marginLeft: '150vh',
}


function Board() {
    
    const [toggled, setToggled] = React.useState(false);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [openup, setopenup] = React.useState(false);
    const [selectWP, setselectWP] = React.useState(false);
    const [renderBK, setrenderBK] = React.useState(false);
    const [displayWidgets, setDisplayWidgets] = React.useState([]);
    const [github, setGithub] = React.useState([]);
    const search = useLocation().search;
    const [databook, setdatabook] = useState(null);
    const [dataup, setdataup] = React.useState("");

    const id_user = new URLSearchParams(search).get('id-user');
    const datenow = new Date().toLocaleString()

    const searchP = async () => {
        window.location.replace('/search?id-user=' + id_user)
    }

    const wishP = async () => {
        setdatabook(await userTools.getdocument(id_user))
        console.log(databook)
        setOpenPopup(true)
    }

    const renderbook = async () => {
        setdatabook(await userTools.getdocument(id_user))
        console.log(databook)
        setrenderBK(true)
    }

    const update = async (data) => {
        setdataup(data)
        console.log(dataup)
        setopenup(true)
    }

        return (
            <div style={{ background: "White" }}>
                <h1 className={styles.titlehome}>MyBooks</h1>
                <div className={styles.user_id}> {id_user}</div>
                <h1 className={styles.datenow}>{datenow}</h1>
                <div className={styles.wishbtnhome}>
                    <Button
                    onClick={() =>wishP()}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="button-submit"
                    value="Submit"
                    >
                        My wish list
                    </Button>
                </div>
                <div className={styles.endbtnhome}>
                    <Button
                    onClick={() =>setselectWP(true)}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="button-submit"
                    value="Submit"
                    >
                        Books finished
                    </Button>
                </div>
                <div className={styles.searchbtnhome}>
                    <Button
                    onClick={() =>searchP()}
                    variant="contained"
                    color="primary"
                    className="button-submit"
                    value="Submit"
                    >
                        Search a New book
                    </Button>
                </div>
                <div className={styles.logoutbtn}>
                    <Button
                    onClick={() =>userTools.logout()}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    value="Submit"
                    >
                        log out
                    </Button>
                </div>
                <div className={styles.renderbtn}>
                    <Button
                    onClick={() =>renderbook()}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="button-submit"
                    value="Submit"
                    >
                        render books
                    </Button>
                </div>
                {renderBK === true && (
                    <div className={styles.renderbooks}>
                        {databook["livrenow"].map((databook => { 
                            
                            // <p>{databook}</p>
                            var data = databook.split('|');
                            var bookName = data[0];
                            var authorName= data[1];
                            var link = data[2];
                            var nbpage = data[3];

                            return ( 
                            <div className={styles.bookpadding}>
                                <p className={styles.wishlistit}>{bookName}</p>
                                <p className={styles.wishlistaut}>{authorName}</p>
                                <p className={styles.wishlistnbp}>{nbpage}</p>
                                <img src={link}/>
                                <div className={styles.homeupbtn}>
                                <Button
                                    onClick={() =>update(databook)}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="button-submit"
                                    value="Submit"
                                    >
                                        update
                                </Button>
                                </div>
                            </div>
                            )
                        }
                        ))
                        }
                    </div>
                )}
                <WishP
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    email={id_user}
                    databook={databook}
                    >
                </WishP>
                <EndbookP
                    selectWP={selectWP}
                    setselectWP={setselectWP}
                    email={id_user}
                    databook={databook}
                    >
                </EndbookP>
                <UpdateP
                    openup={openup}
                    setopenup={setopenup}
                    email={id_user}
                    databook={dataup}
                    >
                </UpdateP>
            </div>
        )
};

export default Board;