import { useContext,useState,useEffect } from "react";
import { SongContext } from "../CountContext";
import data from '../Data/data.jsx'

 const usePlayer=()=>{
  //  const [state, setState] = useContext(SongContext);
    const [count, setCount] = useState(0);
 const [curruntCount, setCurruntCount] = useState(0);
  //const [nextCount, setNextCount] = useState(0);
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
  });

  useEffect(() => {
    $("#heartFill").hide();
    audio = new Audio(data[count].song);
    audiocurunttem=0;
    finaltime=0;
    
  }, [count]);
 /* 
   $('* #Playbutton').on('click',(e)=>{
    let aaa= e.target.textContent;
    setState(aaa)
    setCount(state)
    console.log(state,'nothing');
   })  */

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
  return(
    playAudio,
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
    count,curruntCount,playNext,playPrev,playLoop
    
  );
}

export default usePlayer
