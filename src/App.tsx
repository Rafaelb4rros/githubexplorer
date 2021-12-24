import { Header } from "./components/Header";
import { RepoList } from "./components/RepoList";
import { GetDataContextProvider } from "./contexts/GetData";
import { MobileMenuContextProvider } from "./contexts/MobileMenuContext";

export function App() {
  return (
    <MobileMenuContextProvider>
      <GetDataContextProvider>
        <Header />
        <RepoList />
      </GetDataContextProvider>
    </MobileMenuContextProvider>
  );
}
