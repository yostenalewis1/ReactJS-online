interface IProps {
imageurl: string;
alt: string;
className:string
}

const Image = ({imageurl,alt,className } : IProps) => {
    return (
        <img 
        src= {imageurl}   alt={alt}  className={className}/>
    )
    }

    export default Image; 