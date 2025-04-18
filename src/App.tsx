import { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import useRecordStore from "./store/useRecordStore";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  const { logIn } = useRecordStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      // if (user && user.id) {
      //   await logIn(user?.id);
      // }

      await logIn(772072);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <AppRouter />
    </>
  );
}

export default App;
