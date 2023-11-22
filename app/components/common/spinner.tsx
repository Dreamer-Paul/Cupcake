import { useNavigation } from "@remix-run/react";

export default function SpinnerBar() {
  const navigation = useNavigation();

  return navigation.state === "loading" ? (
    <div className="spinner animate-spinner-bar h-1 z-20 fixed top-0 left-0 right-0 bg-orange-200" />
  ) : null;
}
