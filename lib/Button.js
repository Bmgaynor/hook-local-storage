import styled from 'styled-components'
import React from 'react'

const SyledButton = styled.button`
  color: red;
`
class Button extends React.Component {
  render () {
    return <SyledButton {...this.props}>{this.props.children}</SyledButton>
  }
}

export default Button