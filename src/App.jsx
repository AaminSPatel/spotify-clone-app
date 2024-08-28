import Footer7 from "./Footer7/Footer.jsx";
import Card12 from "./Card12/Card.jsx";
import Card10 from "./Card10/Card.jsx";
import Card11 from "./Card11/Card.jsx";
import Player from "./Player/player.jsx";
import Header1 from "./Header1/header.jsx";
import Sidebar from "./Sidebar/sidebar.jsx";
import data from "./Data/data.jsx";
import { useState, useEffect } from "react";
  //import { createContext } from "react";
  //export const CountContext = createContext([{},() => {}]);
import $ from "jquery";
  import { SongProvider } from "./CountContext.jsx";
//import { useContext } from "react";
function App() {
  const [songdata, setSongdata] = useState([]);
  const [likedSongdata, setLikedSongdata] = useState([]);
  const [countSend, setCountSend] = useState(0);
  let likedSongsArray = data.filter((Song) => Song.isLiked === "liked");
   
 /*
  $(window).scroll(function(){

    if($(document).innerWidth()<651){
      if($(document).scrollTop() > 3840){
        $('#player').css({'position':'unset'})
      }
      else{
        $('#player').css({'position':'fixed'})
      }
    }
    else if($(document).innerWidth()>700&&$(document).innerWidth()<901){
      if($(document).scrollTop() > 2460){
        $('#player').css({'position':'unset'})
      }
      else{
        $('#player').css({'position':'fixed'})
      }
    }
    else{
      if($(document).scrollTop() >= 1180){
   $('#player').css({'position':'unset'})
  }
  else{
    $('#player').css({'position':'fixed'})
  }
    }
  
  });*/
  //console.log(wid,'height');
  useEffect(() => {
    //console.log(songdata);
    setSongdata(data);
    setLikedSongdata(likedSongsArray);
    //console.log(songdata[0]);
    //$('#likedSongs').hide();
    //$('#allSongs').hide();
    //console.log(likedSongsArray);
   

  }, []);
 $('* #Playbutton').on('click',(e)=>{
  let aaa= e.target.textContent;
  console.log('Dbaba he',aaa)
  setCountSend(aaa)
 })
  useEffect(()=>{


  })
  function ClickedButton(e){
    let aaa= e.target.textContent;
  //console.log('Dbaba he',aaa)
  setCountSend(aaa)
  }

  
  return (
    <SongProvider>
    <section id="App-container">
      <div className="App-part1" id="sidebar">
        <Sidebar />
      </div>
      <div className="App-part2" id="middle-content">
        <div>
          <Header1 data={songdata} />
         {/*  <h2>Ha Bhai <h1>Pradhuman</h1> dekha ki nahi dekha ho to msg kr

          </h2> */}
         
          <div className="song-container">
             <div id="allSongs">
              {songdata.map((musicData, index) => {
                return <Card11 id={musicData.id - 1} key={index} />;
              })}
            </div> 
            <div id="likedSongs">
              {likedSongdata.map((liekd, index) => {
                return <Card11 id={liekd.id - 1} key={index} />;
              })}
            </div>
            <div id="likedSongs">
              {songdata.map((data, index) => {
                return (
                  <Card10
                    name={data.artist}
                    artist='Artist'
                    poster={data.poster}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="App-part3">{/* 
        {artist.map((data, index) => {
                return (
                   <Card10
                    name={data.name}
                    artist={data.role}
                    poster={data.poster}
                    key={index}
                  /> 
                );
              })} */}
          <Player
           songId={countSend}
          />
          <Footer7/>
        </div>
      </div>
    </section>
    </SongProvider>
  );
}

export default App;
