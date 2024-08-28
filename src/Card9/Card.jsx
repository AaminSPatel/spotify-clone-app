import profileImg from './profile.png'
import styles from './Card.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import $ from "jquery";

function card(props){
    const[data,setData] = useState([])
    //
    useEffect(()=>{
      setData(props.dat)
    },[])
return(
    <section className={styles.cardContainer}>
        <div className={styles.card1}>
            <h2>{data.genre}</h2>
            
        </div> 
        <div className={styles.card2}>
            <img src={data.poster} alt={data.genre} className={styles.img} />
        </div>
            
    </section>
    
    );
}

export default card