import "./ErrorData.css";

const ErrorData = ({ message }: { message: string }) => {
  return <div className="error-message">{message}</div>;
};

export default ErrorData;
