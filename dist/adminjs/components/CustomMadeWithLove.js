import React from 'react';
import { Box, Icon, Text, Link } from '@adminjs/design-system';
const CustomMadeWithLove = () => (React.createElement(Box, { display: "flex", justifyContent: "center", alignItems: "center", color: "white" },
    React.createElement(Text, { as: "span", variant: "sm" }, "Made with"),
    React.createElement(Box, { px: "xs", display: "flex", alignItems: "center" },
        React.createElement(Icon, { icon: "Heart", color: "primary100", size: 14 })),
    React.createElement(Text, { as: "span", variant: "sm" }, "by"),
    React.createElement(Link, { href: "#", style: { fontSize: '12px', fontWeight: 300, marginLeft: '4px', textDecoration: 'none', color: 'inherit' } }, "Fazujota Full Stack Dev")));
export default CustomMadeWithLove;
