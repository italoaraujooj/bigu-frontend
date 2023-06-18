import { useContext, useState } from "react";
import Router from "next/router";
import { AuthContext } from "@/context/AuthContext";

function useDrawer() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    const toggleDrawer = () => setDrawerIsOpen(prev => !prev);

    const handleNavigateToOfferRide = () => {
      Router.push('/offer-ride');
      setDrawerIsOpen(prev => !prev);
    }
  
    const handleLogout = async () => {
      try {
        await logout();
      } catch (err) {
        console.log(err);
      }
    };
  
  return {
    drawerIsOpen,
    toggleDrawer,
    handleNavigateToOfferRide,
    handleLogout
  };
}

export default useDrawer;
