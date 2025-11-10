import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Navbar } from "../components/navigation/Navbar"
import { Footer } from "../components/navigation/Footer"

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main
        className="flex-1 px-4 py-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}
