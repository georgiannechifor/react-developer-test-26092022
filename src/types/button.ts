import React from "react"

export interface ButtonProps {
  onClick : (event: React.MouseEvent) => void,
  isLoading: boolean,
  buttonLabel?: string
}