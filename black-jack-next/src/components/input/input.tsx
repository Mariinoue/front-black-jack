"use client"

import { InputHTMLAttributes, ChangeEvent, useCallback, ReactNode, useState, useMemo } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void
  label?: ReactNode
  customError?: string | null
}

const Input = ({ handleChange, disabled, readOnly, className = '', label = '', customError = '', ...props }: InputProps) => {
  const [error, setError] = useState<string | null>(null)

  const onHandleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { validity, validationMessage, value } = e.target
    setError(!validity.valid ? validationMessage : null)
    if (handleChange instanceof Function) {
      handleChange(value, e)
    }
  }, [handleChange])

  const errorMessage = useMemo(() => customError || error, [customError, error])
  const hasActionsState = useMemo(() => disabled || readOnly, [disabled, readOnly])
  const canShowError = useMemo(() => errorMessage && !hasActionsState, [errorMessage, hasActionsState])

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={props.id ?? props.name ?? ''}
          className={`block font-medium mb-1.5 px-0.5 text-left text-gray-200 text-sm`}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        onChange={onHandleChange}
        className={`
          w-full block p-3 border rounded-md text-base
          focus:outline-none focus:ring-2 focus:ring-blue-500
          
          /* --- INÍCIO DA MUDANÇA DE ESTILO --- */
          ${disabled ? 'bg-gray-600 border-gray-500 cursor-not-allowed text-gray-400' : ''}
          ${readOnly ? 'bg-gray-700 border-gray-600' : ''}
          /* Ajuste: Fundo escuro, texto claro e borda escura para combinar com o login */
          ${!hasActionsState ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}
          ${canShowError ? 'border-red-500 ring-red-500' : 'border-gray-600'}
          /* --- FIM DA MUDANÇA DE ESTILO --- */
          
          ${className}
        `}
        disabled={disabled}
        readOnly={readOnly}
      />
      <span className={`
        min-h-4 text-red-500 text-xs px-0.5 pt-1 block leading-none 
        ${canShowError ? 'opacity-100 ' : 'opacity-0'}
      `}
      >
        {errorMessage}
      </span>
    </div>
  )
}

export default Input