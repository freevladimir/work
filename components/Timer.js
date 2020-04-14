import Timer from "react-compound-timer";
import React, {useContext} from "react";
import {AppStoreContext} from "../App";

import {observer} from "mobx-react";
const TimerGame = (time)=>{
    const store = useContext(AppStoreContext)
    if(time>0){
        return(
        <div className="timer">
            <Timer initialTime={time} direction="backward">
                {() => (
                    <React.Fragment>
                        <ul>
                            <li style={{ opacity: 0.2 }}>
                                {(<Timer />)._owner.stateNode.state.h - 2 >= 0
                                    ? (<Timer />)._owner.stateNode.state.h - 2
                                    : 24 + (<Timer />)._owner.stateNode.state.h - 2}
                            </li>
                            <li style={{ color: "#979797" }}>
                                {(<Timer />)._owner.stateNode.state.h - 1 >= 0
                                    ? (<Timer />)._owner.stateNode.state.h - 1
                                    : 24 + (<Timer />)._owner.stateNode.state.h - 1}
                            </li>
                            <hr />
                            <li>
                                <Timer.Hours /> h
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                                {(<Timer />)._owner.stateNode.state.h + 1 <= 23
                                    ? (<Timer />)._owner.stateNode.state.h + 1
                                    : Math.abs(
                                        24 - (<Timer />)._owner.stateNode.state.h - 1
                                    )}
                            </li>
                            <li style={{ opacity: 0.2 }}>
                                {(<Timer />)._owner.stateNode.state.h + 2 <= 23
                                    ? (<Timer />)._owner.stateNode.state.h + 2
                                    : Math.abs(
                                        24 - (<Timer />)._owner.stateNode.state.h - 2
                                    )}
                            </li>
                            <li style={{ opacity: 0.1 }}>
                                {(<Timer />)._owner.stateNode.state.h + 3 <= 23
                                    ? (<Timer />)._owner.stateNode.state.h + 3
                                    : Math.abs(
                                        24 - (<Timer />)._owner.stateNode.state.h - 3
                                    )}
                            </li>
                        </ul>
                        <ul>
                            <li style={{ opacity: 0.2 }}>
                                {(<Timer />)._owner.stateNode.state.m - 2 >= 0
                                    ? (<Timer />)._owner.stateNode.state.m - 2
                                    : 60 + (<Timer />)._owner.stateNode.state.m - 2}
                            </li>
                            <li style={{ color: "#979797" }}>
                                {(<Timer />)._owner.stateNode.state.m - 1 >= 0
                                    ? (<Timer />)._owner.stateNode.state.m - 1
                                    : 60 + (<Timer />)._owner.stateNode.state.m - 1}
                            </li>
                            <hr />
                            <li>
                                <Timer.Minutes /> min
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                                {(<Timer />)._owner.stateNode.state.m + 1 <= 59
                                    ? (<Timer />)._owner.stateNode.state.m + 1
                                    : Math.abs(
                                        60 - (<Timer />)._owner.stateNode.state.m - 1
                                    )}
                            </li>
                            <li style={{ opacity: 0.2 }}>
                                {(<Timer />)._owner.stateNode.state.m + 2 <= 59
                                    ? (<Timer />)._owner.stateNode.state.m + 2
                                    : Math.abs(
                                        60 - (<Timer />)._owner.stateNode.state.m - 2
                                    )}
                            </li>
                            <li style={{ opacity: 0.1 }}>
                                {(<Timer />)._owner.stateNode.state.m + 3 <= 59
                                    ? (<Timer />)._owner.stateNode.state.m + 3
                                    : Math.abs(
                                        60 - (<Timer />)._owner.stateNode.state.m - 3
                                    )}
                            </li>
                        </ul>

                        <ul>
                            <li style={{ opacity: 0.2 }}>
                                {(<Timer />)._owner.stateNode.state.s - 2 >= 0
                                    ? (<Timer />)._owner.stateNode.state.s - 2
                                    : 60 + (<Timer />)._owner.stateNode.state.s - 2}
                            </li>
                            <li style={{ color: "#979797" }}>
                                {(<Timer />)._owner.stateNode.state.s - 1 >= 0
                                    ? (<Timer />)._owner.stateNode.state.s - 1
                                    : 60 + (<Timer />)._owner.stateNode.state.s - 1}
                            </li>
                            <hr />
                            <li>
                                <Timer.Seconds /> sec
                            </li>
                            <hr />
                            <li style={{ color: "#979797" }}>
                                {(<Timer />)._owner.stateNode.state.s + 1 <= 59
                                    ? (<Timer />)._owner.stateNode.state.s + 1
                                    : Math.abs(
                                        60 - (<Timer />)._owner.stateNode.state.s - 1
                                    )}
                            </li>
                            <li style={{ opacity: 0.2 }}>
                                {(<Timer />)._owner.stateNode.state.s + 2 <= 59
                                    ? (<Timer />)._owner.stateNode.state.s + 2
                                    : Math.abs(
                                        60 - (<Timer />)._owner.stateNode.state.s - 2
                                    )}
                            </li>
                            <li style={{ opacity: 0.1 }}>
                                {(<Timer />)._owner.stateNode.state.s + 3 <= 59
                                    ? (<Timer />)._owner.stateNode.state.s + 3
                                    : Math.abs(
                                        60 - (<Timer />)._owner.stateNode.state.s - 3
                                    )}
                            </li>
                        </ul>
                    </React.Fragment>
                )}
            </Timer>
        </div>
        )
    } else {
        return(
            <div className="timer">
                <ul>
                    <li style={{opacity: 0.2}}>
                        23
                    </li>
                    <li style={{color: "#979797"}}>
                        0
                    </li>
                    <hr/>
                    <li>
                        1 h
                    </li>
                    <hr/>
                    <li style={{color: "#979797"}}>
                        2
                    </li>
                    <li style={{opacity: 0.2}}>
                        3
                    </li>
                    <li style={{opacity: 0.1}}>
                        4
                    </li>
                </ul>
                <ul>
                    <li style={{opacity: 0.2}}>
                        58
                    </li>
                    <li style={{color: "#979797"}}>
                        59
                    </li>
                    <hr/>
                    <li>
                        00 min
                    </li>
                    <hr/>
                    <li style={{color: "#979797"}}>
                        01
                    </li>
                    <li style={{opacity: 0.2}}>
                        02
                    </li>
                    <li style={{opacity: 0.1}}>
                        03
                    </li>
                </ul>

                <ul>
                    <li style={{opacity: 0.2}}>
                        58
                    </li>
                    <li style={{color: "#979797"}}>
                        59
                    </li>
                    <hr/>
                    <li>
                        00 sec
                    </li>
                    <hr/>
                    <li style={{color: "#979797"}}>
                        01
                    </li>
                    <li style={{opacity: 0.2}}>
                        02
                    </li>
                    <li style={{opacity: 0.1}}>
                        03
                    </li>
                </ul>
            </div>
        )
    }
}

export default TimerGame;