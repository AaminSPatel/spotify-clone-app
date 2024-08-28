import React,{useState,createContext} from "react";

const SongContext = React.createContext([{},() => {}]);

const SongProvider = (props) => {
const [state,setState] = useState({});
return(
    <SongContext.Provider value={[state,setState]}>
        {props.children}

    </SongContext.Provider>
)

}

export {SongContext,SongProvider}