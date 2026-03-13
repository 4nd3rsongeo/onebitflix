import {
  Box,
  BoxProps,
  Button,
  FormGroup,
  H2,
  H5,
  Input,
  Label,
  MessageBox,
  Text,
} from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'
import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'adminjs'
import CustomMadeWithLove from './CustomMadeWithLove.js'

const Wrapper = styled(Box)<BoxProps>`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: #151515;
`

const StyledLogo = styled.img`
  max-width: 200px;
  margin: ${({ theme }) => theme.space.md} 0;
`

const BackgroundPanel = styled(Box)<BoxProps>`
  background-image: url('/login-bg.png');
  background-size: cover;
  background-position: center;
  background-color: #141414; /* Netflix black fallback */
`

/**
 * CustomLogin Component
 * Hardcoded with sarcastic multi-lingual labels as requested.
 * To change labels, modify the 'labels' object below.
 */
export const CustomLogin: React.FC = () => {
  const props = (window as any).__APP_STATE__
  const { action, errorMessage: message } = props
  const { translateMessage } = useTranslation()
  const branding = useSelector((state: any) => state.branding)

  // --- EDIT LABELS HERE ---
  const labels = {
    welcomeHeader: '¡Welcomido!',
    welcomeMessage: '¿Qué hay en el abrigo del conejo?',
    email: "e-mail",
    password: 'Tu contraseña',
    loginButton: 'Entrar',
  }
  // -------------------------

  return (
    <Wrapper flex variant="grey">
      <Box bg="white" height="440px" flex boxShadow="login" width={[1, 2 / 3, 'auto']}>
        <BackgroundPanel
          width="380px"
          flexGrow={0}
          display={['none', 'none', 'block']}
          position="relative"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0,0,0,0.3)"
            p="x3"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            color="white"
          >
            <H2 fontWeight="bold" textAlign="center" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontSize: '40px' }}>
              {labels.welcomeHeader}
            </H2>
            <Text fontWeight="lighter" mt="default" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.8)', fontSize: '18px' }}>
              {labels.welcomeMessage}
            </Text>
          </Box>
        </BackgroundPanel>
        <Box
          as="form"
          action={action}
          method="POST"
          p="x3"
          flexGrow={1}
          width={['100%', '100%', '480px']}
        >
          <H5 marginBottom="xxl">
            {branding.logo ? (
              <StyledLogo src={branding.logo} alt={branding.companyName} />
            ) : (
              branding.companyName
            )}
          </H5>
          {message && (
            <MessageBox
              my="lg"
              message={message.split(' ').length > 1 ? message : translateMessage(message)}
              variant="danger"
            />
          )}
          <FormGroup>
            <Label required>{labels.email}</Label>
            <Input name="email" placeholder={labels.email} />
          </FormGroup>
          <FormGroup>
            <Label required>{labels.password}</Label>
            <Input
              type="password"
              name="password"
              placeholder={labels.password}
              autoComplete="new-password"
            />
          </FormGroup>
          <Text mt="xl" textAlign="center">
            <Button variant="contained">{labels.loginButton}</Button>
          </Text>
        </Box>
      </Box>
      {branding.withMadeWithLove ? (
        <Box mt="xxl">
          <CustomMadeWithLove />
        </Box>
      ) : null}
    </Wrapper>
  )
}

export default CustomLogin
