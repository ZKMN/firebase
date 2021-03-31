import { RouteChildrenProps } from "react-router-dom";
import firebase from "firebase/app";

export interface ICoreLayoutProps extends RouteChildrenProps {
  children: React.ReactNode;
  user: firebase.User | null;
  loginSuccess: (user: firebase.User) => void;
}
