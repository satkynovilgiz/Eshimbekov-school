import Banner from "@/components/BannerMain/Banner";
import styles from "@/styles/Home.module.scss";
import Gallery from "./gallery";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home}>
      <Banner />
      <Gallery/>
    </div>
  );
}
