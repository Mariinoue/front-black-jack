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
          
          ${disabled ? 'bg-gray-300 border-gray-400 cursor-not-allowed text-gray-500' : ''}
          ${readOnly ? 'bg-gray-200 border-gray-400' : ''}
          
          ${!hasActionsState ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500' : ''}
          
          ${canShowError ? 'border-red-500 ring-red-500' : 'border-gray-300'}
          
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