import axios from 'axios';

const SearchApiB = async (searching) => {
    const reqUrl = `https://www.googleapis.com/books/v1/volumes?q=${searching}&key=AIzaSyCDYC9ivvnMPuW4V0L-xO5bqlSog10V_IY`;
    return new Promise(async function(resolve, reject) {
        try {
            const ret = await axios.get(reqUrl, {
                method: 'GET'
            })
            resolve(ret.data);
            console.log(ret.data);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

export default SearchApiB;