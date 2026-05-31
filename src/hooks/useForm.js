/**
 * useForm.js — Reactive form validation hook
 * H5: Prevención de errores — live validation
 * H1: Visibilidad del estado — field-level feedback
 */
import { useState, useEffect } from 'react'

/**
 * @param {object} initialValues   – { fieldName: '' }
 * @param {function} validatorFn   – (values) => { fieldName: 'error msg' }
 */
export function useForm(initialValues, validatorFn) {
  const [values,  setValues]  = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [errors,  setErrors]  = useState({})

  // Re-validate on value changes if field was already touched
  useEffect(() => {
    if (Object.keys(touched).length) {
      setErrors(validatorFn(values))
    }
  }, [values])

  const set = (field) => (value) => {
    setValues(v => ({ ...v, [field]: value }))
    setTouched(t => ({ ...t, [field]: true }))
  }

  const blur = (field) => () => {
    setTouched(t => ({ ...t, [field]: true }))
    setErrors(validatorFn(values))
  }

  const touchAll = () => {
    const all = Object.fromEntries(Object.keys(values).map(k => [k, true]))
    setTouched(all)
    const errs = validatorFn(values)
    setErrors(errs)
    return errs
  }

  const reset = () => {
    setValues(initialValues)
    setTouched({})
    setErrors({})
  }

  const isValid    = Object.keys(validatorFn(values)).length === 0
  const fieldProps = (field) => ({
    value:    values[field],
    onChange: set(field),
    onBlur:   blur(field),
    error:    touched[field] ? errors[field] : '',
    success:  touched[field] && !errors[field] && values[field] ? true : false,
  })

  return { values, errors, touched, set, blur, touchAll, reset, isValid, fieldProps }
}
