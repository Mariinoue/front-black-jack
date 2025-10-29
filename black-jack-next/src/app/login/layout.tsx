import { ReactNode } from "react"

interface LoginLayoutProps {
  children: ReactNode
}

/**
 * Este layout centraliza o conteúdo da página de login
 * na tela, tanto vertical quanto horizontalmente.
 */
const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 w-full">
      {/* Não usamos mais o <header> e <main> separados
        para ter um controle melhor da centralização.
      */}
      {children}
    </div>
  )
}

export default LoginLayout