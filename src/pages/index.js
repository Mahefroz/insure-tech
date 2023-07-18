import Head from "next/head";
import { Inter } from "@next/font/google";
// import Nft from "@/pages/Nft";
import Connect from "./auditsiq/Connect";
import Nft from "./Nft";
import Signin from "./Signin";

export default function Home() {
  return (
    <div sx={{ justifyContent: "center" }}>
      <Connect />
      <Nft />
      {/* <Signin /> */}
    </div>
  );
}
