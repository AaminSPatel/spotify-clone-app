import styles from './Card.module.css'
import PropTypes from 'prop-types'

function card(props){

return(
    <section className={styles.cardContainer}>
        <div className={styles.card}>
                <img src={props.poster} alt={props.name} className={styles.img} />
                <div className={styles.content}>
                    <h2 className={styles.title}>{props.name}</h2>
                    <h3 className={styles.artist}>{props.artist}</h3>
                </div>
            </div>
    </section>
    
    );
}
card.propTypes={
    name:PropTypes.string,
    job:PropTypes.string,
    intrest:PropTypes.string,
}
card.defaultProps = {
    name:"Guest",
    job:'Nothing',
    intrest:'Sleeping',
}
export default card