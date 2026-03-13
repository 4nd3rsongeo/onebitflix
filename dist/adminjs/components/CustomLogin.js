import { Box, Button, FormGroup, H2, H5, Input, Label, MessageBox, Text, } from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'adminjs';
import CustomMadeWithLove from './CustomMadeWithLove.js';
const Wrapper = styled(Box) `
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-color: #151515;
`;
const StyledLogo = styled.img `
  max-width: 200px;
  margin: ${({ theme }) => theme.space.md} 0;
`;
const BackgroundPanel = styled(Box) `
  background-image: url('/login-bg.png');
  background-size: cover;
  background-position: center;
  background-color: #141414; /* Netflix black fallback */
`;
/**
 * CustomLogin Component
 * Hardcoded with sarcastic multi-lingual labels as requested.
 * To change labels, modify the 'labels' object below.
 */
export const CustomLogin = () => {
    const props = window.__APP_STATE__;
    const { action, errorMessage: message } = props;
    const { translateMessage } = useTranslation();
    const branding = useSelector((state) => state.branding);
    // --- EDIT LABELS HERE ---
    const labels = {
        welcomeHeader: '¡Bienvenido al Matrix!',
        welcomeMessage: 'Try not to break the server today, will you?',
        email: "Tu e-mail (Don't lie)",
        password: 'Tu password secreto',
        loginButton: 'Entrar (If you dare)',
    };
    // -------------------------
    return (React.createElement(Wrapper, { flex: true, variant: "grey" },
        React.createElement(Box, { bg: "white", height: "440px", flex: true, boxShadow: "login", width: [1, 2 / 3, 'auto'] },
            React.createElement(BackgroundPanel, { width: "380px", flexGrow: 0, display: ['none', 'none', 'block'], position: "relative" },
                React.createElement(Box, { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, bg: "rgba(0,0,0,0.3)", p: "x3", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white" },
                    React.createElement(H2, { fontWeight: "bold", textAlign: "center", style: { textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontSize: '40px' } }, labels.welcomeHeader),
                    React.createElement(Text, { fontWeight: "lighter", mt: "default", style: { textShadow: '0 1px 5px rgba(0,0,0,0.8)', fontSize: '18px' } }, labels.welcomeMessage))),
            React.createElement(Box, { as: "form", action: action, method: "POST", p: "x3", flexGrow: 1, width: ['100%', '100%', '480px'] },
                React.createElement(H5, { marginBottom: "xxl" }, branding.logo ? (React.createElement(StyledLogo, { src: branding.logo, alt: branding.companyName })) : (branding.companyName)),
                message && (React.createElement(MessageBox, { my: "lg", message: message.split(' ').length > 1 ? message : translateMessage(message), variant: "danger" })),
                React.createElement(FormGroup, null,
                    React.createElement(Label, { required: true }, labels.email),
                    React.createElement(Input, { name: "email", placeholder: labels.email })),
                React.createElement(FormGroup, null,
                    React.createElement(Label, { required: true }, labels.password),
                    React.createElement(Input, { type: "password", name: "password", placeholder: labels.password, autoComplete: "new-password" })),
                React.createElement(Text, { mt: "xl", textAlign: "center" },
                    React.createElement(Button, { variant: "contained" }, labels.loginButton)))),
        branding.withMadeWithLove ? (React.createElement(Box, { mt: "xxl" },
            React.createElement(CustomMadeWithLove, null))) : null));
};
export default CustomLogin;
