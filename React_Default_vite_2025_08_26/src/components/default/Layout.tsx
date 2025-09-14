import styled from "styled-components"
import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"





export default function Layout() {
  return (
    <LayoutContainer>
      <Outlet />
    </LayoutContainer >
  )
}

const LayoutContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
`