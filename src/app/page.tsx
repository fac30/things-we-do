"use client"

import { useEffect } from "react"
import rxdbInit from "@/lib/db/rxdbInit"

export default function Home() {
  useEffect(() => {
    const init = async () => {
      try {
        await rxdbInit()
      } catch (error) {
        console.error("Database initialization error:", error)
      }
    }
    init()
  }, [])
  return (
    <>
      <h1 className="text-red-500">Things We Do Home</h1>
    </>
  )
}
