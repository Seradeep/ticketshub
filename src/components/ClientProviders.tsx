"use client";

import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { LocationProvider } from "../contexts/LocationContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LocationProvider>{children}</LocationProvider>
    </AuthProvider>
  );
}
