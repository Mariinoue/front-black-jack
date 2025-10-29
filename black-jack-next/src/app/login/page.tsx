import LoginForm from "./(components)/login-form/login-form"

/**
 * Esta é a página de login, agora estilizada para
 * parecer com a imagem "Login.jpg".
 */
const LoginPage = () => {
  return (
    // Card principal, escuro, centralizado e com bordas arredondadas
    <div 
      className='bg-slate-900 rounded-lg shadow-xl p-6 sm:p-8 mx-auto w-full' 
      style={{ maxWidth: '400px' }} // Define uma largura máxima
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Simulador de Blackjack
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Tente chegar o mais próximo de 21 sem ultrapassar!
        </p>
      </div>
      
      <h2 className="text-center text-xl font-medium text-white mb-4">
        Login
      </h2>
      <LoginForm />
    </div>
  )
}

export default LoginPage