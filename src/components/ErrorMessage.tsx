interface IProps {
message: string;
}

const ErrorMessage = ({message} : IProps) => {
    return (
        message ? <span className="block text-red-600 text-sm">{message}</span>: null 
    )
    }

    export default ErrorMessage; 