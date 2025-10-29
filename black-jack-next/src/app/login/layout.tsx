import { ReactNode } from "react"

interface LoginLayoutProps {
  children: ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center mt-12 w-full">
      {children}
    </div>
  )
}

export default LoginLayout