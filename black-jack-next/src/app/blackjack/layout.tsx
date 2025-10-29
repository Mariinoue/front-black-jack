import { ReactNode } from "react"

interface BlackjackLayoutProps {
  children: ReactNode
}

const BlackjackLayout = ({ children }: BlackjackLayoutProps) => {
  return (
    <div className="flex flex-col flex-1 items-center align-center justify-center w-full mt-10">
      {children}
    </div>
  )
}

export default BlackjackLayout