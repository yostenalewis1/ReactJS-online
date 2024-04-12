import { HTMLAttributes } from "react";
 

interface IProps extends HTMLAttributes<HTMLSpanElement> {
    color : string
}

const CircleColor = ({color , ...rest} : IProps ) => {
    return (
      <div>

      <span className= {`block w-5 h-5 rounded-full cursor-pointer`} 
            style={{backgroundColor:color}}
        {...rest}
      >
      </span>
       
      </div>
    )
    }

    export default CircleColor; 