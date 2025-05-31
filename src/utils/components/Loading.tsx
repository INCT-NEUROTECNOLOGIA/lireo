import "../layout/loadingStyle.css";

const Loading = () => {
  return (
    <div className="loadingSpinner-container">
      <div className="loadingSpinner" />
      <span>Carregando...</span>
    </div>
  );
};

export default Loading;
