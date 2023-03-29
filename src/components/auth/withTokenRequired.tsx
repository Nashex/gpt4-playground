import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { useRouter } from 'next/router';

type Props = {};

export default function withTokenRequired() {
  return (Component: React.FC<Props>) => {
    const WithTokenRequired = (props: Props) => {
      const { token } = useAuth();
      const router = useRouter();

      if (token === "") {
        return router.push("/");
      }

      return <Component {...props} />;
    };

    return WithTokenRequired;
  };
}
