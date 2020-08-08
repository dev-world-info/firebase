import React, { useEffect, useState } from 'react';
import firebase from './firebase';

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = firebase.firestore().collection('spanish-schools');

  function getSchools() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      // setSchools(items);
      setLoading(false);
    });
    // .catch((err) => {
    //   console.error(err);
    //   setLoading(false);
    // });
  }

  function getSchools2() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setSchools(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getSchools();
    getSchools2();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {schools.map((school) => (
        <div key={school.id}>
          <h1>{school.title}</h1>
          <p>{school.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
