import { useState } from "react";
import styl from "./songCard.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function songCard(prop) {
    const [isLiked,setIsLiked] = useState(null)
    //console.log('connected ho gya he');
  return (
    <section className={styl.container}>
      <div className={styl.card}>
        <div className={styl.card1}>
          <img src={prop.poster} alt={prop.name} />
        </div>
        <div className={styl.card2}>
          <div className={styl.card21}>
            <h2>{prop.name}</h2>
            <h3>{prop.artist}</h3>
          </div>
          <div className={styl.card22}>
            <p
              onClick={() => {
                isLiked ? setIsLiked(false) : setIsLiked(true)
              }}
            >
                {
                    isLiked ?<FaRegHeart className={styl.hearticon} id="heartEmpty" />:<FaHeart className={styl.hearticon} id="heartFill" />
                }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
