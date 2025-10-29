import LoginForm from "./(components)/login-form/login-form"

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div 
        className='bg-slate-900 rounded-lg p-6 sm:p-8 w-full' 
        style={{ maxWidth: '400px' }}
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
    </div>
  )
}

export default LoginPage