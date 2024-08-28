import { FaRegHeart, FaHeart, FaBars, FaVolumeHigh } from "react-icons/fa6";
import { TiArrowShuffle } from "react-icons/ti";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { IoMdPlayCircle } from "react-icons/io";
import { IoPauseCircle } from "react-icons/io5";

import { useState, useEffect,useContext } from "react";
//import Audio from "./audioplayer.jsx";
import data from "../Data/data.jsx";
import style from "./player.module.css";
import SongCard from "../SongCard/songCard.jsx";
  import { SongContext } from "../CountContext.jsx";
//import usePlayer from '../hooks/usePlayer.js'

export default function Player(prop) {
/* 
const {playAudio,
  pauseAudio,
  isLiked,
  isplaying,
  isLooped,
  isShuffle,intervalfunc,
  intervall,
  intervl,
  finalTime,
  fullScreen,
  fullscreen,
  volumeSeek,
  valueRange,
  volumeValue,
  audio,
  audiocurunttem,
  audios,TimeFormate,
  clickPlay,
  likeClick,
  shuffleclick,
  handleRangeSeek,
  setCount,
  setCurrentTim,setCurruntCount,setFinalTime,setFullScreen,
  count,curruntCount,playNext,playPrev} = usePlayer()
 */
   const [count, setCount] = useState(0);
  const [curruntCount, setCurruntCount] = useState(0);
  const [nextCount, setNextCount] = useState(0);
  const [volumeValue, setVolumeValue] = useState(50);
  const [finalTime, setFinalTime] = useState(0);
  const [isLooped, setIsLooped] = useState();
  const [isShuffle, setIsShuffle] = useState();
  const [intervl, setIntervl] = useState(null);
  const [isplaying, setIsplaying] = useState(false);
  const [audios, setAudios] = useState(null);
  const [currentTim, setCurrentTim] = useState(0);
  const [isLiked, setIsLiked] = useState();
  const [fullScreen, setFullScreen] = useState(true);
  const [valueRange,setValueRange] = useState();
  let LOOP;
  //const clickPlaycard = useRef(2)
  const [state,setState] = useContext(SongContext);
  useEffect(() => {
    $("#heartFill").hide();
    $("#rangeInp").val(0);
    setVolumeValue(10);
    setIsLiked(false);
    console.log(state);
  }, []);

  useEffect(() => {
    $("#heartFill").hide();
    audio = new Audio(data[count].song);
    audiocurunttem=0;
    finaltime=0;
    
  }, [count]);
 
   $('* #Playbutton').on('click',(e)=>{
    let aaa= e.target.textContent;
    setState(aaa)
    setCount(state)
    console.log(state,'nothing');
   }) 

  function playLoop() {
    if (isLooped) {
      LOOP = false;
      setIsLooped(LOOP);
      $("#loopbutten").css("color", "white");
    } else {
      LOOP = true;
      setIsLooped(LOOP);
      $("#loopbutten").css("color", "green");
    }
  }

  let intervall;
  let audio = new Audio(data[count].song);
  let finaltime;
  let audiocurunttem = 0;

  function intervalfunc(aud) {
    if (audiocurunttem !== aud.duration) {
      
     // $("#rangeInp").val(0);
     audiocurunttem = aud.currentTime;
      setCurrentTim(aud.currentTime);
      let Time = Math.floor((audiocurunttem / aud.duration) * 100);
      $("#rangeInp").val(Time);
    } else {
      //audio.pause();
      $("#playNext").trigger("click");
    }
  }

  function playAudio() {
    //audio.load()
    
    //console.log(audio.play(), " awawa ", audio);
    audio.currentTime = currentTim;
    audio.volume = volumeValue / 100;
    // $("#pl2").show();
    //$("#pl1").hide();
    setAudios(audio);
    setIsplaying(true);
    
    finaltime = audio.duration;
    setFinalTime(finaltime);
    setCurrentTim(audio.currentTime);
    audio.play();
    intervall = setInterval(() => intervalfunc(audio), 100);
    setIntervl(intervall);
  }

  const pauseAudio = () => {
    audios.pause();
    setIsplaying(false);
    $("#pl1").show();
    $("#pl2").hide();
    clearInterval(intervl);
    //$("#rangeInp").val(0);
  };

  const playNext = () => {
    $("#rangeInp").val(0);
    setCurrentTim(0);

    if (isplaying) {
      pauseAudio();
      setFinalTime(audio.duration);
      setTimeout(() => {
        //playAudio();
        $("#playbutton").trigger("click");
      }, 500);
    } else {
      //pauseAudio();
      //console.log("playnext paused");
    }
    if (isLooped) {
      //console.log('islooped true he to loop hoga');
      if (isShuffle) {
        let randomnum = Math.floor(Math.random() * data.length);

        count == data.length - 1 ? setCount(0) : setCount(randomnum);
      } else {
        count == data.length - 1 ? setCount(0) : setCount(count + 1);
      }
    } else {
      if (isShuffle) {
        let randomnum = Math.floor(Math.random() * data.length);

        count == data.length - 1
          ? (setCount(count), $("#playNext").css({ opacity: "0.5" }))
          : (setCount(randomnum),
            $("#playNext").css({ opacity: "1" }),
            $("#playPrev").css({ opacity: "1" }));
      } else {
        count == data.length - 1
          ? (setCount(count), $("#playNext").css({ opacity: "0.5" }))
          : (setCount(count + 1),
            $("#playNext").css({ opacity: "1" }),
            $("#playPrev").css({ opacity: "1" }));
      }
    }
  };

  const playPrev = () => {
    //clearInterval(intervall);
    $("#rangeInp").val(0);
    setCurrentTim(0);

    if (isplaying) {
      //setCountInterval(0);
      setFinalTime(audio.duration);
      pauseAudio();
      setTimeout(() => {
        $("#playbutton").trigger("click");
        //playAudio();
      }, 50);
    } else {
    }

    if (isLooped) {
      if (isShuffle) {
        let rando = Math.floor(Math.random() * data.length);

        count == 0 ? setCount(data.length - 1) : setCount(rando);
      } else {
        count == 0 ? setCount(data.length - 1) : setCount(count - 1);
        //console.log('previous me islooped true he to loop hoga');
      }
    } else {
      if (isShuffle) {
        let rando = Math.floor(Math.random() * data.length);

        count == 0
          ? (setCount(data.length - 1), $("#playPrev").css({ opacity: "0.5" }))
          : (setCount(rando),
            $("#playNext").css({ opacity: "1" }),
            $("#playPrev").css({ opacity: "1" }));
      } else {
        count == 0
          ? (setCount(count), $("#playPrev").css({ opacity: "0.5" }))
          : (setCount(count - 1),
            $("#playNext").css({ opacity: "1" }),
            $("#playPrev").css({ opacity: "1" }));
      }
    }
  };

  $("#playerbq").css({
    backgroundImage: `linear-gradient(#0b0606cd , #2b2626cd), url( ${data[count].poster} )`,
  });
  function clickPlay() {
    //console.log(isplaying);
    if (!isplaying) {
      playAudio();
      console.log(isplaying, "pause tha play kiya");
    } else {
      pauseAudio();
      console.log("play tha audio paused");
      //console.log(isplaying, "paused", audios);
    }
  }

  //This is function to change time or progress bar with specific time
  function handleRangeSeek(e) {
    let val = Math.floor(e.target.value);
    //let val1=val.toFixed(6);
    setValueRange(val);
    let vb = parseInt((val * audio.duration).toFixed(6));
    audios.currentTime = vb / 100;
    //console.log(val,audios.currentTime,vb)
    //playAudio();
  }

  const TimeFormate = () => {
    let curntTimeFormatMinute = Math.floor(currentTim / 60);
    let curntTimeFormatSecond = Math.floor(currentTim % 60);

    if (curntTimeFormatMinute < 10) {
      curntTimeFormatMinute = `0` + curntTimeFormatMinute;
    }
    if (curntTimeFormatSecond < 10) {
      curntTimeFormatSecond = `0` + curntTimeFormatSecond;
    }
    //console.log(curntTimeFormatMinute,' : ',curntTimeFormatSecond);

    return `${curntTimeFormatMinute}:${curntTimeFormatSecond}`;
  };

  function shuffleclick() {
    if (isShuffle) {
      setIsShuffle(false);
      $("#shufflebutton").css("color", "white");
      console.log("shuffle Off");
    } else {
      setIsShuffle(true);
      $("#shufflebutton").css("color", "green");
      console.log("shuffle on");
    }
  }
  function fullscreen() {
    if (fullScreen) {
      setFullScreen(false);
      $("body").css({ overflowY: "hidden", overflow: "hidden" });
    } else {
      setFullScreen(true);
      $("body").css({ overflowY: "unset", overflow: "unset" });
    }
  }

  function likeClick() {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }

  function volumeSeek(e) {
    //audios.volume = 0.2
    let vol = e.target.value;
    setVolumeValue(vol);
    audios.volume = vol / 100;

    // audios.currentTime()
    console.log(audios.volume);
  }
 
  return (
    
    <section className={style.a} id="player1">
      {fullScreen ? (
        <section className={style.player} id="player">
          <div className={style.pl1}>
            <div className={style.play1}>
              {/*               <img src={data[curruntCount].poster} alt={data[count].name} />
               */}{" "}
              <div>
                <h2>
                  {data[count].name} <small> {data[count].artist}</small>
                </h2>
              </div>
              <p onClick={likeClick}>
                {!isLiked ? <FaRegHeart /> : <FaHeart />}
              </p>
            </div>
          </div>
          <div className={style.play222}>
            <div className={style.progress}>
              <p>{TimeFormate()}</p>
              <div className={style.progres1}>
                <div id="progress1">
                  <input
                    type="range"
                    id="rangeInp"
                    
                    onChange={(e) => handleRangeSeek(e)}
                  />
                </div>
              </div>
              <p>
                {" "}
                {`${
                  Math.floor(finalTime / 60) < 10
                    ? `0` + Math.floor(finalTime / 60)
                    : Math.floor(finalTime / 60)
                }:${
                  Math.floor(finalTime % 60) < 10
                    ? `0` + Math.floor(finalTime % 60)
                    : Math.floor(finalTime % 60)
                }`}
              </p>
            </div>
          </div>
          <div className={style.pl2}>
            <div className={style.playpart22}>
              <div className={style.play22}>
                <div className={style.play221}>
                  <ul className={style.plicon}>
                    <li onClick={shuffleclick} id="shufflebutton">
                      <TiArrowShuffle />
                    </li>
                    <li onClick={playPrev} id="playPrev">
                      <MdSkipPrevious />
                    </li>
                    <li onClick={clickPlay} id="playbutton">
                      {!isplaying ? <IoMdPlayCircle /> : <IoPauseCircle />}
                    </li>
                    <li onClick={playNext} id="playNext">
                      <MdSkipNext />
                    </li>
                    <li id="loopbutten">
                      <HiArrowPathRoundedSquare onClick={() => playLoop()} />
                    </li>
                  </ul>

                  <ul className={style.tlicon}>
                    <li>
                      <FaBars />
                    </li>
                    <li className={style.volbtn}>
                      <p className={style.volicon}>
                        <FaVolumeHigh />
                      </p>
                      <p
                        className={style.volumebar}
                        id="volumebar"
                        onMouseOver={() => $("#volumebar").show()}
                      >
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volumeValue}
                          onChange={(e) => volumeSeek(e)}
                        />
                      </p>
                    </li>
                    <li onClick={fullscreen}>
                      {fullScreen ? (
                        <AiOutlineFullscreen />
                      ) : (
                        <AiOutlineFullscreenExit />
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className={style.player1}>
          <div className={style.playpart1} id="playerbq">
            <div className={style.plcard2}>
              <SongCard
                name={data[count].name}
                artist={data[count].artist}
                poster={data[count].poster}
              />
            </div>
          </div>
          <div className={style.play222}>
            <div className={style.progress}>
              <p>{TimeFormate()}</p>
              <div className={style.progres1}>
                <div id="progress1">
                  <input
                    type="range"
                    id="rangeInp"
                    onChange={(e) => handleRangeSeek(e)}
                  />
                </div>
              </div>
              <p>
                {" "}
                {`${
                  Math.floor(finalTime / 60) < 10
                    ? `0` + Math.floor(finalTime / 60)
                    : Math.floor(finalTime / 60)
                }:${
                  Math.floor(finalTime % 60) < 10
                    ? `0` + Math.floor(finalTime % 60)
                    : Math.floor(finalTime % 60)
                }`}
              </p>
            </div>
          </div>
          <div className={style.playpart22}>
            <div className={style.play22}>
              <div className={style.play221}>
                <ul className={style.plicon}>
                  <li onClick={shuffleclick} id="shufflebutton">
                    <TiArrowShuffle />
                  </li>
                  <li onClick={playPrev} id="playPrev">
                    <MdSkipPrevious />
                  </li>
                  <li onClick={clickPlay} id="playbutton">
                    {!isplaying ? <IoMdPlayCircle /> : <IoPauseCircle />}
                  </li>
                  <li onClick={playNext} id="playNext">
                    <MdSkipNext />
                  </li>
                  <li id="loopbutten">
                    <HiArrowPathRoundedSquare onClick={() => playLoop()} />
                  </li>
                </ul>

                <ul className={style.tlicon}>
                  <li>
                    <FaBars />
                  </li>
                  <li className={style.volbtn}>
                    <p className={style.volicon}>
                      <FaVolumeHigh />
                    </p>
                    <p className={style.volumebar} id="volumebar">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volumeValue}
                        onChange={(e) => volumeSeek(e)}
                      />
                    </p>
                  </li>
                  <li onClick={fullscreen}>
                    {fullScreen ? (
                      <AiOutlineFullscreen />
                    ) : (
                      <AiOutlineFullscreenExit />
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
