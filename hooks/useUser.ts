import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { atom, useAtom } from "jotai";
import { emptyUser, User } from "../config/UserTypes";

const userAtom = atom(emptyUser);
const setUserAtom = atom(
  (get) => {
    return get(userAtom);
  },
  (get, set, update) => {
    set(userAtom, update);
  }
);

export default function useUser() {
  const queryClient = useQueryClient();

  const [user, setUser] = useAtom(setUserAtom);

  const { data, refetch } = useQuery(
    "user",
    () => axios.get("/api/user?type=refresh"),
    {
      onSuccess: (data) => {
        setUser({ isLoggedIn: data?.data?.user?.id, ...data.data } as User);
      },
      onError: (err) => {
        console.log("err", err);
      },
      enabled: false,
    }
  );

  const loginUser = (newInfo: any) => {
    return axios.post("/api/login", newInfo);
  };

  let loginMutation = useMutation(loginUser, {});

  const logoutUser = () => {
    return axios.post("/api/logout");
  };

  let logoutMutation = useMutation(logoutUser, {
    onSuccess: (data) => {
      queryClient.setQueryData("user", emptyUser);
      setUser(emptyUser);
      Router.push("/");
    },
  });

  const logUserIn = async (loginInfo, onSuccess, onFail) => {
    loginMutation.mutate(loginInfo, {
      onError: (err) => {
        onFail();
        console.log(err);
      },
      onSuccess: (data) => {
        queryClient.setQueryData("user", {
          data: { isLoggedIn: true, ...data.data },
        });
        console.log(data);
        setUser({ isLoggedIn: true, ...data.data });
        onSuccess();
      },
    });
  };

  const updateUser = (newInfo: any) => axios.post("/api/user", newInfo);

  const deleteUser = () =>
    axios.post("/api/user", {
      type: "delete",
    });

  let deleteMutation = useMutation(deleteUser, {
    onSuccess: (data) => {
      queryClient.setQueryData("user", emptyUser);
      setUser(emptyUser);
      Router.push("/");
    },
  });

  let mutation = useMutation(updateUser, {
    onError: (err) => {
      console.log("err", err);
    },
    onSuccess: (data) => {
      setUser({ isLoggedIn: true, ...data.data });
      queryClient.setQueryData("user", data);
    },
  });

  useEffect(() => {
    if (queryClient.getQueryData("user") === undefined) {
      refetch();
    }
  }, [queryClient.getQueryData("user")]);

  const getUserAgain = async (afterAction: () => void) => {
    await refetch();
    afterAction();
  };

  return {
    getUserAgain,
    user: user,
    logUserIn: logUserIn,
    deleteMutation,
    logoutMutation,
    isLoggedIn: user?.isLoggedIn,
    userMutation: mutation,
  };
}
