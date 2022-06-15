import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Explore.module.css";
import { userInfo } from "os";

const Explore: NextPage = (props) => {

  return (
    <>
      <div className={styles.container}>
      
          <h1 className={styles.title}> Explore </h1>

          <p className={styles.description}>
            hello there 
          </p>

        
    

     
      </div>
    </>
  );
};

export default Explore;
