"use client";
import React, { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  return (
    <SidebarContext.Provider value={{ sideBarVisible, setSideBarVisible }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
