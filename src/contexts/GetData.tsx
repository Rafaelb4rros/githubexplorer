import {
  createContext,
  FormEvent,
  LegacyRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMobileMenuContext } from "../hooks/useMobileMenuContext";
import { api } from "../services/githubapi";
import { responseData } from "../utils/commonTypes";

type GetDataContextProvider = {
  children: ReactNode;
};

type rateLimitInfo = {
  reset: number;
  limit: number;
  used: number;
};

type GetDataContext = {
  isLoading: boolean;
  responseData: responseData[];
  handleSearch: (e: FormEvent) => void;
  setSearch: (value: string) => void;
  responseStatus: string;
  search: string;
  setIsLoading: (value: boolean) => void;
  rateLimitInfo: rateLimitInfo | undefined;
  resetTime: Date | undefined;
  setResponseStatus: (value: string) => void;
  rateLimitExceeded: boolean;
  setResponseData: (value: responseData[]) => void;
};

export const GetDataContext = createContext({} as GetDataContext);

export function GetDataContextProvider({ children }: GetDataContextProvider) {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetTime, setResetTime] = useState<Date>();
  const [rateLimitInfo, setRateLimitInfo] = useState<rateLimitInfo>();
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [responseData, setResponseData] = useState<responseData[]>([]);
  const [responseStatus, setResponseStatus] = useState("");
  const { activeCheckbox } = useMobileMenuContext();

  useEffect(() => {
    api.rateLimit.get("").then((res) => {
      const { core } = res.data.resources;
      const isRateLimitExceeded = core.used === core.limit;
      setRateLimitExceeded(isRateLimitExceeded);
      setResetTime(new Date(core.reset * 1000));
      setRateLimitInfo(core);
    });

    return () => {};
  }, [responseData]);

  async function getData() {
    try {
      setIsLoading(true);
      const response = await api.getData(activeCheckbox, search);
      if (response.status === 200) {
        setSearch("");
      }
      setResponseData([...responseData, { ...response, isExpanded: false }]);
    } catch (err) {
      console.log("error: " + err);
      setResponseStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = (e: FormEvent) => {
    if (search.trim() === "") return;
    e.preventDefault();
    getData();
  };

  return (
    <GetDataContext.Provider
      value={{
        isLoading,
        setResponseStatus,
        responseData,
        handleSearch,
        setSearch,
        responseStatus,
        setIsLoading,
        search,
        rateLimitInfo,
        resetTime,
        rateLimitExceeded,
        setResponseData,
      }}
    >
      {children}
    </GetDataContext.Provider>
  );
}
