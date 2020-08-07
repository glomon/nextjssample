import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";


import Link from "next/link";

import Head from 'next/head'
const MetaHash = require('metahash-js');


var address = '0x0037f57bab204dd99ebcc84ac9d46a23fa0561cd65c1782f24';
var kekec = [];





function Home({balanceResult}) {
 
 	var linkec = "https://venus.mhscan.com/?page=address&id=" + balanceResult.address;
 	//console.log(balanceResult);
 	
 	const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
   // console.log(data);
    kekec = data[0];
	console.log(watch(kekec));
    //address = kekec;
    }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

 	
 	
 	
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js </a>& <a href="https://nextjs.org">Metahash-js API</a>!
        </h1>

        <p className="description">
          Get started by reading pages on <code><a href="http://www.metahash.org" target="_blank">metahash.org</a></code>
        </p>

        <div className="grid">
        
         <form onSubmit={handleSubmit(onSubmit)}>
      <label className="description">Address: </label>
      <input name="example" className="formwidth"  defaultValue={kekec} ref={register} />
    
      <input type="submit"  />
    </form>
        
        
          <a href={linkec} target="_blank" className="card">
            <h3>Wallet Address &rarr;</h3>
            <p>{  balanceResult.address  }</p>
          </a>

          <a href={linkec} target="_blank" className="card">
            <h3>Wallet Balance &rarr;</h3>
            <p>{ ( balanceResult.received -  balanceResult.spent) / 1e6 }</p>
          </a>

          <a href={linkec} target="_blank" className="card">
            <h3>Wallet Delegation &rarr;</h3>
            <p>{ ( balanceResult.delegate -  balanceResult.undelegate) / 1e6 }</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          wrap: break-word;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        
        .formwidth {
         font-size: 1rem;
         width:500px;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
            overflow-wrap: break-word;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps() {



	const Wallet = MetaHash.Wallet;
    const API = MetaHash.API;
    const api = new API();

    const balanceResult = await api.fetchBalance({ address: address });
   // var result = await balanceResult;
   console.log(balanceResult);


    return {
        props: {
          balanceResult,  
        },
    }
}






export default Home