import React, { useState } from "react";
import AppRouter from "./router";
import Preloader from "./Components/Preloader/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  function handlePreloaderFinish() {
    setLoading(false);
  }

  return (
    <>
      <AppRouter />
      {/* {loading && <Preloader onFinish={handlePreloaderFinish} />} */}
      {/* {!loading && <AppRouter />} */}
    </>
  );
}

export default App;
