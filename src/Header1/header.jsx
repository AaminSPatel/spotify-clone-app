import style from './header.module.css'
import Card33 from '../Card12/Card.jsx'
import data from "../Data/data.jsx";
import $ from "jquery";

import { GrInstallOption } from "react-icons/gr";
import {FaAngleRight,FaAngleLeft,FaCircleUser ,FaBell} from 'react-icons/fa6'
export default function Header(props){
    function allLiked(){
        //$('#likedSongs').toggle();
        //$('#allSongs').toggle();
        $('* #likeText:eq("liked")').text();
        console.log($('* #likeText:eq("liked")').text());

        //console.log(likedSongsArray);     
    }
    return(
        <header className={style.header}>
             <div className={style.head1}>
                <ul className={style.head1ul1}>
                    <li><FaAngleLeft/></li>
                    <li><FaAngleRight/></li>
                </ul>
                <ul className={style.head1ul2}>
                    <li className={style.exppre}><a href="#">Explore Premium</a></li>
                    <li><a href="#" className={style.instapp}><GrInstallOption className={style.iconinstal}/> Install App</a></li>
                    <li onClick={allLiked}><FaBell/></li>
                    <li><FaCircleUser /></li>
                </ul>
             </div>
             <div className={style.head2}>
             <ul className={style.head2ul}>
                    <li><a href="#">All</a></li>
                    <li><a href="#">Music</a></li>
                    <li><a href="#">Podcasts</a></li>
                </ul>
             </div>
             <div className={style.head3}>
             <ul className={style.head3ul}>
                    <li>
                       <Card33 name={data[0].name} poster={data[0].poster} artist={data[0].artist}/>
                    </li>
                    <li>
                        <Card33 name={data[1].name}  poster={data[1].poster} artist={data[1].artist}/>
                    </li>
                    <li>
                       <Card33 name={data[2].name}  poster={data[2].poster} artist={data[2].artist}/>
                    </li>
                    <li>
                        <Card33 name={data[3].name}  poster={data[3].poster} artist={data[3].artist}/>
                    </li>
                    <li>
                       <Card33 name={data[4].name}  poster={data[4].poster} artist={data[4].artist}/>
                    </li>
                    
                </ul>
             </div>
        </header>
    )
}