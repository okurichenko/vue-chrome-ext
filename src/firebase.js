import Firebase from 'firebase'

const app = Firebase.initializeApp({
    apiKey: 'AIzaSyAYYtsPixEV7rd34HrJVkH0bOZDgjGvYtc',
    authDomain: 'cooperate-for-food.firebaseapp.com',
    databaseURL: 'https://cooperate-for-food.firebaseio.com',
    projectId: 'cooperate-for-food',
    storageBucket: 'cooperate-for-food.appspot.com',
    messagingSenderId: '1031851904352'
})

export default app
