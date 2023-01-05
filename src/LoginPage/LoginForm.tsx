import { useCallback, useState } from 'react';
import Input from './Input';
import styled, { css } from 'styled-components';
import { DefaultFontsStyles } from '../DefaultStyles';

const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_LENGTH = 8;

const LoginForm = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    email: false,
    password: false,
  })

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const setErrors = useCallback((key: string, value: boolean) => {
    setError({
      ...error,
      [key]: value,
    })
  }, [error])

  const onChange = useCallback((value: string, fieldName: string) => {
    if (error.email || error.password){
      setErrors(fieldName, false)
    }
    setValues({
      ...values,
      [fieldName]: value,
    })
  }, [error.email, error.password, values, setErrors])

  const validateEmail = (email: string) => {
    const isValid = EMAIL_REGEXP.test(email)
    return isValid
  }

  const validatePassword = (password: string) => {
    const isError = password.length >= PASSWORD_LENGTH
    return isError
  }

  const getPayload = () => {
    return {
      email: values.email,
      password: values.password,
    }
  }

  const login = (payload: {
    email: string,
    password: string,
  }) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      console.log(payload)
    }, 5000)
  }

  const onSubmit = () => {
    const payload = getPayload();
    const isEmailValid = validateEmail(payload.email)
    const isPasswordValid = validatePassword(payload.password)
    if (isEmailValid && isPasswordValid) {
      login(payload)
    } else {
      setError({
        password: !isPasswordValid,
        email: !isEmailValid,
      })
    }
  }

  return (
    <LoginFormWrapper>
      <Header>
        <Title>Вход</Title>
        <P>Для существующих пользователей</P>
      </Header>
      <InputWrapper>
        <Input
          type={"email"}
          name={"email"}
          required={true}
          label={"E-Mail"}
          loading={loading}
          error={error.email}
          onChange={onChange}
          value={values.email}
          errorText={'Укажите корректный email адрес'}
        />
        <Input
          required={true}
          label={"Пароль"}
          type={"password"}
          name={"password"}
          loading={loading}
          onChange={onChange}
          error={error.password}
          value={values.password}
          errorText={'Укажите валидный пароль (минимум 8 символов)'}
        />
      </InputWrapper>
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? '. . . Загрузка' : 'Войти в систему'}
      </Button>
    </LoginFormWrapper>
  )
}

const Header = styled.div`
  margin-bottom: 20px;
`

const LoginFormWrapper = styled.div`
  width: 320px;
  display: flex;
  padding: 20px;
  min-height: 400px;
  border-radius: 10px;
  background: #FFFFFF;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

const Title = styled.div`
  ${DefaultFontsStyles}
  text-align: center;
  font-weight: 600;
  font-size: 24px;
`

export const P = styled.p`
  ${DefaultFontsStyles}
  text-align: center;
  font-size: 14px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Button = styled.button<{
  disabled?: boolean
}>`
  ${DefaultFontsStyles}
  width: 50%;
  height: 30px;
  display: flex;
  padding: 10px;
  border: unset;
  font-size: 12px;
  color: #FFFFFF;
  align-items: center;
  background: #2e00ff;
  ${props => props.disabled && 'opacity: 0.15'};
  cursor: ${props => !props.disabled && 'pointer'};
 ${props => !props.disabled
    && css` :active {
    padding: 6px;
    border: 2px solid rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -3px 0px rgba(0, 0, 0, 0.1);
  }`}
`

export default LoginForm;
