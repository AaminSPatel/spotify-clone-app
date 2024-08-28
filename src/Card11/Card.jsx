import styles from "./Card.module.css";
import { FaSpotify, FaRegHeart, FaHeart } from "react-icons/fa6";
import { IoPauseCircle } from "react-icons/io5";
import { IoMdPlayCircle } from "react-icons/io";
import { useEffect, useState,useContext} from "react";
import data from "../Data/data.jsx";

function card(props) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [count, setCount] = useState(0);
  let songId = props.id;
  //const jsmediatags = require('jsmediatags');
  let dataSong = data[songId].isLiked;
  function likeClick(e) {
    let currentId = parseInt(e.target.textContent);
    if (data[currentId - 1].isLiked === "liked") {
      data[songId].isLiked = "disliked";
      //console.log(data[currentId - 1].isLiked, currentId);
      $(`.HeartDisLike:eq(${props.id})`).show();
      $(`.HeartLike:eq(${props.id})`).hide();
      setLikedSongs(data[songId]);
      dataSong = "disliked";
    } else {
      data[songId].isLiked = "liked";
      $(`.HeartDisLike:eq(${props.id})`).hide();
      $(`.HeartLike:eq(${props.id})`).show();
      //console.log(data[currentId - 1].isLiked, currentId);
      setLikedSongs(data[songId].isLiked);
      dataSong = "liked";
    }
    //console.log(dataSong);
  }
let num;
  useEffect(() => {
    setLikedSongs(likedSongs);
    songId = props.id;
    if (data[props.id].isLiked === "liked") {
      $(`.HeartDisLike:eq(${props.id})`).hide();
      $(`.HeartLike:eq(${props.id})`).show();
      dataSong = "liked";
    } else {
      $(`.HeartDisLike:eq(${props.id})`).show();
      $(`.HeartLike:eq(${props.id})`).hide();
      dataSong = "disliked";
    }
    //dataSong=data[songId].isLiked;
    setLikedSongs(data[songId]);
    //console.log(dataSong);
    $("* #play2").hide();
      setCount(-1);
      
  }, []);
   
  num=-1;
  function clickPlay(e) {
    //$('* #play1').hide();
    //$('* #play1').show();
     let ee= parseInt(e.target.textContent);
     //console.log(ee);
     //setCount(ee)
    
    if (ee === props.id&&num!==ee) {
      $("* #play2").hide();
      $("* #play1").show();
      $(`* #play1:eq(${props.id})`).toggle();
      $(`* #play2:eq(${props.id})`).toggle();
      //console.log("num =",num,'if wala',props.id,ee);
      num=ee
      //console.log("num =",num,'if wala',props.id,ee);
      //count=null;
      //setCount(null);
      
    }
       else {
      //setCount(props.id);
      //setCount(ee)
      ee = props.id;
      $(`* #play1:eq(${props.id})`).toggle();
      $(`* #play2:eq(${props.id})`).toggle();
      //console.log("num =",num,'else wala',props.id,ee);
      num=ee
      //console.log("num =",num,'else wala',props.id,ee);

    }
    console.log('click hua he yha');
        
  }

  return (
    <section className={styles.cardContainer}>
      <div className={styles.card2} id="card2">
        <img src={data[songId].poster} alt="" />
        <p id={styles.spotifyBox}>
          <FaSpotify id={styles.spotifylogo} />
        </p>
        <p id={styles.heartBox} onClick={(e) => likeClick(e)}>
          <FaRegHeart id={styles.heartlogo} className="HeartDisLike" />
          <i
            style={{
              display: "inline",
              fontSize: "20px",
              height: "30px",
              width: "30px",
              zIndex: "3",
              background: "black",
              opacity: 0,
              position: "absolute",
              left: "0",
              borderRadius: "20px",
              top: "0",
            }}
            id="idContainer"
          >
            {data[songId].id}
          </i>

          <FaHeart id={styles.heartlogo} className="HeartLike" />
        </p>
      </div>
      <div className={styles.card1} id="Cardka2">
      <p
          onClick={(e) => clickPlay(e)}
          className={styles.playbutton}
          id="Playbuttoncard"
        >
          <IoMdPlayCircle id="play1" className={styles.playbutton1} />
          <IoPauseCircle id="play2" className={styles.playbutton2} />
          <span style={{
            display: "inline",
            fontSize: "25px",
            height: "30px",
            width: "30px",
            zIndex: "3",
            background: "",
            color:'red',
            opacity: 0,
            position: "absolute",
            left: "0",
            borderRadius: "20px",
            top: "0",
          }}>{props.id}</span>
        </p>
        <h2>{data[songId].name}</h2>
        <h3>{data[songId].artist}</h3>
        <p
          id="likeText"
          style={{ opacity: "0", height: "0", width: "0", fontSize: "15px" }}
        >
          {dataSong}
        </p>
        
      </div>
    </section>
  );
}

export default card;
