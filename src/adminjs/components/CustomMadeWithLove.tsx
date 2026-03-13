import React from 'react'
import { Box, Icon, Text, Link } from '@adminjs/design-system'

const CustomMadeWithLove: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" color="white">
    <Text as="span" variant="sm">
      Made with
    </Text>
    <Box px="xs" display="flex" alignItems="center">
        <Icon icon="Heart" color="primary100" size={14} />
    </Box>
    <Text as="span" variant="sm">
      by
    </Text>
    <Link href="#" style={{ fontSize: '12px', fontWeight: 300, marginLeft: '4px', textDecoration: 'none', color: 'inherit' }}>
      Fazujota Full Stack Dev
    </Link>
  </Box>
)

export default CustomMadeWithLove
