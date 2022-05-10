import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useRef, useLayoutEffect, SetStateAction, MutableRefObject } from 'react'

const triangleSize = 15;
const triangleSide = 5
function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}
function Boid(props) {
    const { boid } = props;
    const [boidStyle, setBoidStyle] = useState({});
    useEffect(() => {
        const style = {
            width: 0,
            height: 0,
            position: "absolute",
            bottom: boid.y,
            left: boid.x,
            transition: ".1s",
            "borderTop": `${triangleSide}px solid transparent`,
            "borderBottom": `${triangleSide}px solid transparent`,
            "borderLeft": `${triangleSize}px solid black`,
            transform: `rotate(-${calcAngleDegrees(boid.x_velocity, boid.y_velocity)}deg)`,
        }
        setBoidStyle(style);
    }, [boid]);

    return (
        <div style={boidStyle}></div >
    )
}
export default Boid;