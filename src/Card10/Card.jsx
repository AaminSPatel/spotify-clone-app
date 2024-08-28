import styles from './Card.module.css'

function card(props){

return(
    <section className={styles.cardContainer}>
         
        <div className={styles.card2}>
            <img src={props.poster} alt={props.name} className={styles.img} />
        </div>
        <div className={styles.card1}>
            <h2>{props.name}</h2>
            <h3>{props.artist}</h3>
        </div>
            
    </section>
    
    );
}

export default card