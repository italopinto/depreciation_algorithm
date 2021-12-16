import Head from 'next/head'
import Menu from '../objects/menu'

export default function Home() {

  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@creativebulma/bulma-divider@1.1.0/dist/bulma-divider.min.css"/>
        <title>Algoritmo de depreciação</title>
      </Head>
      <div className="container is-fluid">
        <section className="section">
          <h2 className="title is-2 has-text-centered is-uppercase">Algoritmo de depreciação</h2>
        </section>
        <Menu/>

      </div>
    </>
  )
}
