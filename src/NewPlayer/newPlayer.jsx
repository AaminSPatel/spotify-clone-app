
import { FaRegHeart, FaHeart, FaBars, FaVolumeHigh } from "react-icons/fa6";
import { TiArrowShuffle } from "react-icons/ti";
import { GiMicrophone } from "react-icons/gi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { BsFilePlay } from "react-icons/bs";
import { PiDevices } from "react-icons/pi";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { IoMdPlayCircle } from "react-icons/io";
import { IoPauseCircle } from "react-icons/io5";

import { useState, useEffect } from "react";
//import Audio from "./audioplayer.jsx";
import data from "../Data/data.jsx";
import style from "./newPlayer.module.css";

import SongCard from "../SongCard/songCard.jsx";

export default function Player(prop) {
  const [count, setCount] = useState(0);
  const [curruntCount, setCurruntCount] = useState(0);
  const [nextCount, setNextCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [isLooped, setIsLooped] = useState();
  const [isShuffle, setIsShuffle] = useState();
  const [intervl, setIntervl] = useState(null);
  const [isplaying, setIsplaying] = useState(false);
  const [audios, setAudios] = useState(null);
  const [currentTim, setCurrentTim] = useState(0);
  const [isLiked, setIsLiked] = useState();
  const [fullScreen, setFullScreen] = useState();
  let LOOP;
  
  useEffect(() => {
    $("#heartFill").hide();
    $("#pl1").show();
    //LOOP = false;
    //setIsLooped(true)
    $("#pl2").hide();
    //playLoop()
    $("#rangeInp").val(0);
    setCurruntCount(count);
    setNextCount(count + 1);
    console.log("next count set hua he");
    setPrevCount(data.length - 1);
    setIsLiked(false)
  }, []);

  //console.log('nahar');

  function playLoop() {
    if (isLooped) {
      LOOP = false;
      setIsLooped(LOOP);
      //console.log("Loop remove", isLooped);
      $("#loopbutten").css("color", "white");
    } else {
      LOOP = true;
      setIsLooped(LOOP);
      //console.log("Looped", isLooped);
      $("#loopbutten").css("color", "green");
    }
    //console.log('playloop run');
    ///clickPlay();
  }

  let intervall;
  let audio = new Audio(data[curruntCount].song);
  let finaltime;
  let audiocurunttem = 0;

  function intervalfunc(aud) {
    //console.log("isloop =", LOOP);
    // console.log("Final time",audiocurunttem,audio.currentTime,aud.duration);

    if (audiocurunttem == aud.duration) {
      $("#rangeInp").val(0);
      //audiocurunttem=0;
      //audios.currentTime= 0
      setCurrentTim(0);
      $("#playNext").trigger("click");
      //console.log("Final time",audiocurunttem,audio.currentTime,aud.duration);
    } else {
      audiocurunttem = aud.currentTime;
      setCurrentTim(aud.currentTime);
      let Time = Math.floor((audiocurunttem / aud.duration) * 100);
      $("#rangeInp").val(Time);
    }
  }
  function stopseek() {
    clearInterval(intervl);
  }

  function playAudio() {
    audio.play();
    audio.currentTime = currentTim;
    $("#pl2").show();
    $("#pl1").hide();
    setAudios(audio);
    setIsplaying(true);
    finaltime = audio.duration;
    setFinalTime(finaltime);
    setCurrentTim(audio.currentTime);
    intervall = setInterval(() => intervalfunc(audio), 100);
    setIntervl(intervall);
  }

  const pauseAudio = () => {
    audios.pause();
    setIsplaying(false);
    $("#pl1").show();
    $("#pl2").hide();
    clearInterval(intervl);
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
        setNextCount(randomnum);
        setPrevCount(count);
        //setCurruntCount(count)
        console.log(
          "loop with suffle  prevcount =",
          prevCount,
          " currentcount =",
          curruntCount,
          " nextcount = ",
          nextCount
        );
        count == data.length - 1 ? setCount(0) : setCount(nextCount);
        count == data.length - 1
          ? setCurruntCount(0)
          : setCurruntCount(nextCount);
      } else {
        setNextCount(count == data.length - 1 ? 0 : count + 1);
        setPrevCount(curruntCount);
        console.log(
          "loop without suffle  prevcount =",
          prevCount,
          " currentcount =",
          curruntCount,
          " nextcount = ",
          nextCount
        );

        count == data.length - 1 ? setCount(0) : setCount(count + 1);
        count == data.length - 1
          ? setCurruntCount(0)
          : setCurruntCount(nextCount);
      }
    } else {
      if (isShuffle) {
        let randomnum = Math.floor(Math.random() * data.length);
        setNextCount(randomnum);
        setPrevCount(curruntCount);
        console.log(
          "without loop suffle  prevcount =",
          prevCount,
          " currentcount =",
          curruntCount,
          " nextcount = ",
          nextCount
        );
        count == data.length - 1 ? setCount(count) : setCount(nextCount);
        count == data.length - 1
          ? setCurruntCount(count)
          : setCurruntCount(nextCount);
      } else {
        setNextCount(count == data.length - 1 ? 0 : count +1);
        setPrevCount(count == data.length -1 ?count - 1 : curruntCount);
        console.log(
          "without loop without suffle  prevcount =",
          prevCount,
          " currentcount =",
          curruntCount,
          " nextcount = ",
          nextCount,
          ' count = ',count
        );
        count == data.length - 1 ? setCount(count) : setCount(count + 1);
        count == data.length - 1
          ? setCurruntCount(count)
          : setCurruntCount(nextCount);

        //console.log('loop roka gya he');
      }
    }
    $("#playerbq").css({
      backgroundImage: `linear-gradient( #0f0f0a75, #1c1b1cf4), url(${data[count== data.length-1? count:nextCount].poster}) `,
    });
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
      //console.log("yes playprevious played");
    } else {
      //pauseAudio();
      //console.log("no playprevious paused ");
    }

    if (isLooped) {
      if (isShuffle) {
        let rando = Math.floor(Math.random() * data.length);
        setNextCount(count);
        setPrevCount(rando);
        console.log(
          "with loop with suffle  prevcount =",
          prevCount,
          " currentcount =",
          curruntCount,
          " nextcount = ",
          nextCount
        );
        count == 0 ? setCount(data.length - 1) : setCount(nextCount);
        count == 0
          ? setCurruntCount(data.length - 1)
          : setCurruntCount(prevCount);
        // console.log();
      } else {
        setNextCount(curruntCount);
        setPrevCount(count == 0 ? data.length - 1 : count - 1);
        console.log(
          "with loop without suffle  prevcount =",
          prevCount,
          " currentcount =",
          curruntCount,
          " nextcount = ",
          nextCount
        );
        //count == 0 ? setCount(data.length - 1) : setCount(nextCount);
        count == 0
          ? setCurruntCount(data.length - 1)
          : setCurruntCount(prevCount);
        count == 0 ? setCount(data.length - 1) : setCount(count - 1);
        //console.log('previous me islooped true he to loop hoga');
      }
    } else {
      if (isShuffle) {
        let rando = Math.floor(Math.random() * data.length);
        setNextCount(curruntCount);
        setPrevCount(rando);
        console.log(
          "without loop with suffle  prevcount =",
          prevCount,
          " currentcount =",
          curruntCount,
          " nextcount = ",
          nextCount
        );
        count == 0 ? setCount(data.length - 1) : setCount(nextCount);
        count == 0
          ? setCurruntCount(data.length - 1)
          : setCurruntCount(prevCount);
      } else {
        setNextCount(count == 0?1:curruntCount);
        setPrevCount(count == 0 ? data.length -1 : count - 1);
        console.log(
          "1 without loop without suffle  prevcount =",
          prevCount,
          " currentcount =",
          curruntCount,
          " nextcount = ",
          nextCount,' count = ',count
        );
        //count == 0 ? setCount(data.length - 1) : setCount(nextCount);
        count == 0 ? setCurruntCount(count) : setCurruntCount(prevCount);
        count == 0 ? setCount(count) : setCount(count - 1);
      }
    }
    $("#playerbq").css({
      backgroundImage: `linear-gradient( #0f0f0a75, #1c1b1cf4), url(${data[count==0?0:prevCount].poster}) `,
    });
  };

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
    //setValueRange(val);
    let vb = parseInt((val * audio.duration).toFixed(6));
    audios.currentTime = parseFloat(vb / 100);
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
      $('body').css({overflowY: 'hidden',
        overflow: 'hidden'})
    } else {
      setFullScreen(true); 
      $('body').css({overflowY: 'unset',
        overflow: 'unset'})
    }
  }

  function likeClick(){
    if(isLiked){
      setIsLiked(false)
    }
    else{
      setIsLiked(true)
    }
  }

  function volumeSeek(e){
      //audios.volume = 0.2
      let vol = e.target.value;

      audios.volume = vol/100

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
 */}              <div>
                <h2>{data[curruntCount].name} <small> {data[curruntCount].artist}</small></h2>
                
              </div>
              <p
                onClick={likeClick}
              >
                {
                !isLiked ?<FaRegHeart  /> :
                <FaHeart />                
              }
                
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
                  <li onClick={playPrev}>
                    <MdSkipPrevious />
                  </li>
                  <li onClick={clickPlay} id="playbutton">
                    {
                      !isplaying ? <IoMdPlayCircle /> :<IoPauseCircle />
                    }
                   
                    
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
                    <p className={style.volumebar} id='volumebar' onMouseOver={()=>
                      $("#volumebar").style.display = 'unset'
                    }>
                      <input type="range" min='0' max='100' onChange={(e) => volumeSeek(e)}/>
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
            </div>
          </div>
          </div>

        </section>



      ) : (



        <div className={style.player1}>
          <div className={style.playpart1} id="playerbq">
            <div className={style.plcard1}>
              <SongCard
                name={data[prevCount].name}
                artist={data[prevCount].artist}
                poster={data[prevCount].poster}
              />
            </div>
            <div className={style.plcard2}>
              <SongCard
                name={data[curruntCount].name}
                artist={data[curruntCount].artist}
                poster={data[curruntCount].poster}
              />
            </div>
            <div className={style.plcard3}>
              <SongCard
                name={data[nextCount].name}
                artist={data[nextCount].artist}
                poster={data[nextCount].poster}
              />
            </div>
          </div>

          <div className={style.playpart22}>
            <div className={style.play22}>
              <div className={style.play221}>
                <ul className={style.plicon}>
                  <li onClick={shuffleclick} id="shufflebutton">
                    <TiArrowShuffle />
                  </li>
                  <li onClick={playPrev}>
                    <MdSkipPrevious />
                  </li>
                  <li onClick={clickPlay} id="playbutton">
                    {
                      !isplaying ? <IoMdPlayCircle /> :<IoPauseCircle />
                    }
                   
                    
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
                    <p className={style.volumebar} id='volumebar' onMouseOver={()=>
                      $("#volumebar").style.display = 'unset'
                    }>
                      <input type="range" min='0' max='100' onChange={(e) => volumeSeek(e)}/>
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
