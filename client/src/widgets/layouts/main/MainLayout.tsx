import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/widgets/Header'

// defualt Layout
const MainLayout = () => {
  return (
    <article className={"font-mimiWorld"}>
      <section className="main">
          <Header />
          <Outlet />
      </section>
    </article>
  )
}

export default MainLayout