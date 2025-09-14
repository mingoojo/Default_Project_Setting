"use client"

import React, { useState } from "react"
import { useServerInsertedHTML } from "next/navigation"
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components"
import { Reset } from "styled-reset"

import GlobalStyle from "../assets/styles/GlobalStyle"
import { defaultTheme } from "../assets/styles/ThemeSet"
import { CookiesProvider } from "react-cookie"


export default function ThemeClient({ children } : {children : React.ReactNode}) {

  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== "undefined") {
    return <>{children}</>
  }



  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={defaultTheme}>
        <Reset/>
        <GlobalStyle />
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </ThemeProvider>
    </StyleSheetManager>
  )
}