import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, updateDoc, getDoc, arrayUnion, arrayRemove, increment  } from 'firebase/firestore'
import firebaseConfig from './config'
import { getAuth, signOut } from 'firebase/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider, FacebookAuthProvider, linkWithPopup, GoogleAuthProvider } from "firebase/auth"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();


async function signgoogle() {
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // ...
    return true
  }).catch((error) => {
    console.log(error)
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    return false
  });

}


async function createdocument(email) {
  try {
    setDoc(doc(db, "users", email), {
      livrenow: [],
      nblivrenow: 0,
      wishlist: [],
      nbwishlist: 0,
      endedbook: [],
      nbendedbook: 0
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getdocument(email) {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  return docSnap.data()
}


async function add_bok_now(email, databook) {
  try {updateDoc(doc(db, "users", email), {
    livrenow: arrayUnion(databook),
    nblivrenow: increment(1)
  });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function remove_bok_now(email, databook) {
  console.log("hello")
  try {updateDoc(doc(db, "users", email), {
    livrenow: arrayRemove(databook),
    nblivrenow: increment(-1)
  });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function add_bok_end(email, databook) {
  try {updateDoc(doc(db, "users", email), {
    endedbook: arrayUnion(databook),
    nbendedbook: increment(1)
  });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function add_bok_wish(email, databook) {
  try {updateDoc(doc(db, "users", email), {
    wishlist: arrayUnion(databook),
    nbwishlist: increment(1)
  });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function remove_bok_wish(email, databook) {
  try {updateDoc(doc(db, "users", email), {
    wishlist: arrayRemove(databook),
    nbwishlist: increment(-1)
  });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


async function addUserDatabase(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    createdocument(email)
    window.location.replace('/home?id-user=' + this.state.email)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

async function logout() {
  signOut(auth).then(() => {
    window.location.replace('/login')
  }).catch((error) => {
    console.log(error)
  });
}

async function checkUserDatabase(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      window.location.replace('/home?id-user=' + email)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

const userTools = {
    addUserDatabase,
    checkUserDatabase,
    createdocument,
    logout,
    add_bok_now,
    add_bok_end,
    add_bok_wish,
    getdocument,
    signgoogle,
    remove_bok_wish,
    remove_bok_now,
    //githubauth,
    //facebookauth,
};

export default userTools;

export { db, auth };