import { useCallback, useState } from 'react';
import Input from './Input';
import styled, { css } from 'styled-components';
import { DefaultFontsStyles, shimmerStyles } from '../DefaultStyles';

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

  const onChange = useCallback((value: string, fieldName: string) => {
    if (error.email || error.password) {
      setError({
        ...error,
        [fieldName]: false,
      })
    }
    setValues({
      ...values,
      [fieldName]: value,
    })
  }, [values, error])

  const validateEmail = (email: string) => {
    return EMAIL_REGEXP.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= PASSWORD_LENGTH
  }

  const login = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      console.log(values)
    }, 5000)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const isEmailValid = validateEmail(values.email)
    const isPasswordValid = validatePassword(values.password)
    if (isEmailValid && isPasswordValid) {
      login()
    } else {
      setError({
        password: !isPasswordValid,
        email: !isEmailValid,
      })
    }
  }

  return (
    <LoginFormWrapper onSubmit={(e) => onSubmit(e)}>
      <Header>
        <Title>Login</Title>
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
          errorText={'Enter a valid email address'}
        />
        <Input
          required={true}
          label={"Password"}
          type={"password"}
          name={"password"}
          loading={loading}
          onChange={onChange}
          error={error.password}
          value={values.password}
          errorText={'Enter a valid password (minimum 8 characters)'}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button type='submit' disabled={loading}>
          {loading ? '. . . Loading' : 'Login'}
        </Button>
      </ButtonWrapper>
    </LoginFormWrapper>
  )
}

const Header = styled.div`
  margin: 30px;
`

const LoginFormWrapper = styled.form`
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`

const Button = styled.button<{
  disabled?: boolean
}>`
  ${DefaultFontsStyles}
  width: 70%;
  height: 40px;
  display: flex;
  padding: 10px;
  border: unset;
  font-size: 12px;
  color: #FFFFFF;
  border-radius: 10px;
  align-items: center;
  background: #2e00ff;
  justify-content: center;
  ${props => props.disabled && 'opacity: 0.15'};
  cursor: ${props => !props.disabled && 'pointer'};
  &:focus{
    border: 2px solid black;
  }
 ${props => !props.disabled
    && css` :active {
    padding: 6px;
    border: 2px solid rgba(0, 0, 0, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px -3px 0px rgba(0, 0, 0, 0.1);
  }`}
`

export default LoginForm;
