import { createContext, useState } from "react";
import {
  loginRequest,
  save,
  getValueFor,
  registerRequest,
  logoutRequest,
} from "./user.service";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = (data: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const formattedData = JSON.stringify({
        email: data.email,
        password: data.password,
      });
      setIsLoading(true);
      loginRequest(formattedData)
        .then(async (data: any) => {
          setError(false);
          setIsAuthenticated(true);
          setIsLoading(false);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          reject(err);
        });
    });
  };
};
