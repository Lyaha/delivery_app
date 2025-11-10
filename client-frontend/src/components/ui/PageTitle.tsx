import type { ReactNode } from "react"

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">
      {children}
    </h1>
  )
}