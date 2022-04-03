import Container from '@material-ui/core/Container';
import React, { Component, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import userTools from './Firebase/Firebase';
import styles from './mystyle.module.css';

export function SearchP() { {

    const [data, setdata] = useState({})
    const [search, setMachin] = useState("")
    const [is_search, setis_search] = React.useState(false);
    const search1 = useLocation().search;
    const id_user = new URLSearchParams(search1).get('id-user');

    const displaysearch = async () => {
        const SearchApiB = async () => {
            const reqUrl = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyCDYC9ivvnMPuW4V0L-xO5bqlSog10V_IY`;
            return new Promise(async function(resolve, reject) {
                try {
                    const ret = await axios.get(reqUrl, {
                        method: 'GET'
                    })
                    resolve(ret.data);
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            })
        }
        if (search != "") {
            setdata(await SearchApiB(search))
            console.log(data.items[0]["volumeInfo"])
            setis_search(true)
        }

    }
    const onChange = (event) => {
        setMachin(event.target.value)
    };

    const StartBook = () => {
        const str = data.items[0]["volumeInfo"]["title"] + "|" + data.items[0]["volumeInfo"]["authors"] + "|" + data.items[0]["volumeInfo"]["imageLinks"]["thumbnail"] + "|" + "0"
        console.log(str)
        console.log(id_user)
        userTools.add_bok_now(id_user, str)
        return
    };

    const Addlistw = () => {
        const str = data.items[0]["volumeInfo"]["title"] + "|" + data.items[0]["volumeInfo"]["authors"] + "|" + data.items[0]["volumeInfo"]["imageLinks"]["thumbnail"]
        console.log(str)
        console.log(id_user)
        userTools.add_bok_wish(id_user, str)
        return
    };

    const back = () => {
        window.location.replace('/home?id-user=' + id_user)
        return
    };
        return (
            <div>
                <Container>
                    
                    <form className={styles.searchview}> 
                    <h1 className={styles.titlehome}>MyBooks</h1>
                        <div>
                            <TextField
                                required
                                onChange={onChange}
                                variant="outlined"
                                label="search a book"
                                className={styles.searchc}
                                value={search}
                            />
                        </div>
                        <div>
                            <Button
                                onClick={() => displaysearch()}
                                variant="contained"
                                color="primary"
                                className={styles.searchb}
                                value="Submit"
                            >
                            Search
                            </Button>
                        </div>
                    </form>
                </Container>
                        {is_search === true && (
                                <Container>
                                <div className={styles.foundbookview}>
                                    <img 
                                        src={data.items[0]["volumeInfo"]["imageLinks"]["thumbnail"]}
                                        alt="new"
                                        width="400" 
                                        height="550"
                                    />
                                    <h1 className={styles.titlefoundbook}>
                                        {data.items[0]["volumeInfo"]["title"]}
                                    </h1>
                                    <h1 className={styles.descfoundbook}>
                                        {data.items[0]["volumeInfo"]["description"]}
                                    </h1>
                                    <div className={styles.addfoundbook}>
                                    <Button
                                        onClick={() => StartBook()}
                                        variant="contained"
                                        color="primary"
                                        className="button-submit"
                                        value="Submit"
                                        >
                                        start it
                                    </Button>
                                    </div>
                                    <div className={styles.wishfoundbook}>
                                    <Button
                                        onClick={() => Addlistw()}
                                        variant="contained"
                                        color="primary"
                                        className="button-submit"
                                        value="Submit"
                                        >
                                        Add to wish list
                                    </Button>
                                    </div>
                                    <div className={styles.backfoundbook}>
                                    <Button
                                        onClick={() => back()}
                                        variant="contained"
                                        color="primary"
                                        className="button-submit"
                                        value="Submit"
                                        >
                                        back to home
                                    </Button>
                                    </div>
                                </div>
                                </Container>
                        )}
            </div>
        )
    }
}

export default SearchP;