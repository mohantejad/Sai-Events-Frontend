"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

const WithAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch by checking after mount
    useEffect(() => {
      setIsMounted(true);

      if (!user) {
        router.push("/login");
      }
    }, [user, router]);

    if (!isMounted) return null;
    if (!user) return null;

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;
