const loading = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <span className="loading loading-dots loading-xs"></span>
      <span className="loading loading-dots loading-sm"></span>
      <span className="loading loading-dots loading-md"></span>
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default loading;
