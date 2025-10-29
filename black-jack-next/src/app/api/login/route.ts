import { NextResponse } from "next/server"

type LoginResponse = {
  token?: string
  message?: string
}

interface LoginBody {
  email: string
  password: string
}

export async function POST(request: Request): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginBody = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ message: 'Email e senha são obrigatórios' }, { status: 400 })
    }

    if (email === 'email@teste.com' && password === process.env.USER_SECRET_PASSWORD) {
      return NextResponse.json({ token: 'fake-jwt-token', message: "Login bem-sucedido" })
    }

    return NextResponse.json({ message: 'Email ou senha inválidos' }, { status: 401 })
  } catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({
      message
    })
  }
}