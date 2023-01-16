import React, { ReactNode, FC } from 'react'
import Head from 'next/head'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ title = 'go-next-sns', children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}
