import { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import useRecordStore from "./store/useRecordStore";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import useTg from "./hooks/useTg";

function App() {
  const { logIn } = useRecordStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useTg();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      if (user && user.id) {
        await logIn(user?.id);
      }
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
