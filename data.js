const firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyA4T-tBpQ1QfQkuUVtdfNHPgT18rnp91LQ",
    authDomain: "postings-c1147.firebaseapp.com",
    databaseURL: "https://postings-c1147.firebaseio.com",
    projectId: "postings-c1147",
    storageBucket: "postings-c1147.appspot.com",
    messagingSenderId: "344578532393",
    appId: "1:344578532393:web:b015ef344a2e04f4f2e838"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


const getAllPostings = async () => {
    const postingRef = db.collection('postings');
    return postingRef.orderBy('num').get();
}

const addPosting = async (data) => {
    data.accountNo = parseInt(data.accountNo)
    data.num = parseInt(data.num)
    data.amount = parseFloat(data.amount)
    data.finished = false
    await db.collection('postings').add(data);
    const postings = await getAllPostings()
    return postings
}

const finishPosting = async (id) => {
    await db.collection('postings').doc(id).update({
        finished: true
    });
    const postings = await getAllPostings()
    return postings
}

module.exports = {
    getAllPostings,
    finishPosting,
    addPosting
}

