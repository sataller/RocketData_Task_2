import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { DefaultFontsStyles, shimmerStyles } from '../DefaultStyles';

type PropsType = {
  type: string
  name: string
  value: string
  label?: string
  error: boolean
  loading: boolean
  required?: boolean
  errorText?: string
  onChange: (value: string, fieldName: string) => void
}

const Input = ({
  type,
  name,
  label,
  error,
  value,
  onChange,
  errorText,
  loading = false,
  required = false,
}: PropsType) => {
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, name)
  }
  return (
    <InputWrapper>
      {label
        && <Label>
          {label}:
          {required
            && <Required>*</Required>
          }
        </Label>
      }
      {!loading
        ? <StyledInput
          name={name}
          type={type}
          error={error}
          value={value}
          onChange={onChangeInput}
        />
        : <InputShimmer loading={loading ? 1 : 0} />
      }
      {error
        && <ErrorMessage>
          {errorText || 'Something wrong!'}
        </ErrorMessage>
      }
    </InputWrapper>
  )
}

const StyledInput = styled.input<{
  error?: boolean
}>`
  height: 40px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  border: 1px solid ${props => props.error ? '#ff0000' : '#bdb8b8'};
  ${DefaultFontsStyles}
`

const InputShimmer = styled.input<{
  loading?: 0 | 1
}>`
  height: 40px;
  border: unset;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  ${props => props.loading && shimmerStyles};
  
`

const InputWrapper = styled.div`
  display: flex;
  min-height: 90px;
  flex-direction: column;
`

const Required = styled.span`
  color: #ff0000;
`

const Label = styled.label`
  ${DefaultFontsStyles}
  line-height: 100%;
  font-weight: 400;
  font-size: 12px;
`

const ErrorMessage = styled.p`
  ${DefaultFontsStyles}
  line-height: 100%;
  color: #ff0000;
  font-weight: 400;
  font-size: 12px;
`

export default Input;