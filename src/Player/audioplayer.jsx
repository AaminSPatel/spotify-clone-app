import React from 'react';
import { useEffect } from 'react';
import { IoPauseCircle } from "react-icons/io5";
import { IoMdPlayCircle } from "react-icons/io";
let playing;
function AudioPlayer(prop) {
    const audio = new Audio(prop.song);
    //const preAudio = new Audio(prop.prevSong[prop.cont + 1]);
  const playAudio = () => {
    
    if(playing==false){
        audio.play();
        playing=true;
        $('#pl2').show()
        $('#pl1').hide()
    }
    else{
        audio.pause();
        playing=false;
        $('#pl1').show()
        $('#pl2').hide()
    }

    console.log(playing);
  };
/*
  const pauseAudio = () => {
    const audio = new Audio(prop.song);
    audio.pause();
    playing=true;
    console.log(playing);
  };
  */

  useEffect(()=>{
    //playAudio;
    playing=false;
    //console.log(playing);
    console.log(prop.cont);
    console.log(prop.prevSong[prop.cont]);
    $('#pl1').show()
    $('#pl2').hide()
    audio.pause();
  },[prop.cont])


/*  
  <div className={style.play21}>
                <ul className={style.plicon}>
                  <li>
                    <TiArrowShuffle />
                  </li>
                  <li onClick={playPrev}>
                    <MdSkipPrevious />
                  </li>
                  <li onClick={clickPlay} id="playbutton">
                    <IoMdPlayCircle id="pl1" />
                    <IoPauseCircle id="pl2" />
                  </li>
                  <li onClick={playNext}>
                    <MdSkipNext />
                  </li>
                  <li>
                    <HiArrowPathRoundedSquare onClick={() => playLoop()} />
                  </li>
                </ul>

                <ul className={style.tlicon}>
                  <li>
                    <FaBars />
                  </li>

                  <li>
                    <FaVolumeHigh />
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
              <div className={style.play22}>
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
*/

  return (
    <div>
      <p onClick={playAudio}><IoMdPlayCircle id='pl1'/><IoPauseCircle  id='pl2'/></p>
    </div>
  );
}

export default AudioPlayer;