import { Header } from "./components/Header";
import { RepoList } from "./components/RepoList";
import { DataContextProvider } from "./contexts/DataContext";
import { ToggleMenuContextProvider } from "./contexts/ToggleMenuContext";

export function App() {
  return (
    <ToggleMenuContextProvider>
      <DataContextProvider>
        <Header />
        <RepoList />
      </DataContextProvider>
    </ToggleMenuContextProvider>
  );
}
