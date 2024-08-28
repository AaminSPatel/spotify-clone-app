import style from "./sidebar.module.css";
import { useEffect } from "react";
import { TiHome } from "react-icons/ti";
import { HiOutlineBars3 } from "react-icons/hi2";
import { HiCollection,HiOutlineCollection } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import $ from "jquery";

import data from '../Data/data.jsx'


export default function Sidebar() {
  useEffect(() => {
    $("* #sho").hide();
    $('*#list-link').hide();
    $('#ico1').hide()
      $('#ico2').show()
  },[]);
  function expandsidebar() {
    let width = $("#container-sidebar").width();
    const list = $("* #list-link");

    if (width == 50) {
      $("#container-sidebar").width("300px");
      list.css("display", "inline");
      $("* #sho").css("display", "flex");
      $('#ico1').hide()
      $('#ico2').show()
      $('#sidebar').width(300);
      $('#middle-content').css('marginLeft','300px');
      //$('#middle-content').width(300);
      //$('#middle-content').width(915)
      //console.log($('#middle-content').width());
      
    } else {
      $("#container-sidebar").width("50px");
      list.hide();
      $("* #sho").hide();
      $('#ico1').show();
      $('#ico2').hide();
      $('#sidebar').width(50);
      $('#middle-content').css('marginLeft','50px');
      //$('#middle-content').width(1215)
      //$('.lyb1>p').css('justify-content','center');
    }
  }

  return (
    <section className={style.container} id="container-sidebar">
      <div className={style.s1}>
        <ul>
          <li>
            <TiHome />
            <p id="list-link">Home</p>
          </li>
          <li>
            <IoSearchSharp />
            <p id="list-link">Search</p>
          </li>
        </ul>
      </div>
      <div className={style.s2}>
        <ul>
          <li>
            <div className={style.lyb1} onClick={() => expandsidebar()}>
              <p>
                <span className={style.listopen} id='listopen'>
                    <HiCollection id="ico2"/>
                    <HiOutlineCollection id="ico1"/>
                </span>
                <span id="sho"> Your Library</span>
              </p>
              <p className={style.addPlaylist} id="sho">
                <FaCirclePlus />
              </p>
            </div>
            <div className={style.lyb2} id="sho">
              <p className={style.tags}>Artists</p>
            </div>
            <div className={style.lyb3} id="sho">
              <IoSearchSharp />
              <p>
                Recents <HiOutlineBars3 />
              </p>
            </div>
          </li>

          <li>
            <img src={data[0].poster} alt={data[0].artist} className={style.imglist}/>
            <p id="sho" className={style.pnam}>{data[0].artist}</p>
          </li>
          <li>
            <img src={data[1].poster} alt={data[1].artist} className={style.imglist}/>
            <p id="sho" className={style.pnam}>{data[1].artist}</p>
          </li>
          <li>
            <img src={data[2].poster} alt={data[2].artist} className={style.imglist}/>
            <p id="sho" className={style.pnam}>{data[2].artist}</p>
          </li>
            
        </ul>
      </div>
    </section>
  );
}
