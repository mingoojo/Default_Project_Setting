import apiController from "@/api/apiController";
import { ApiError } from "@/api/ApiError";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

type PrivateRouterProps = {
  component: React.ReactNode
}

export default function PrivateRouter({ component }: PrivateRouterProps) {
  const navigation = useNavigate()

  const directoryData = async () => {
    try {
      await apiController.getUserAll()
    } catch (error) {

      if (error instanceof ApiError) {
        if (error.status !== 403) {
          console.log(error)
          localStorage.clear()
          alert("로그인 정보가 확인되지 않습니다.")
          navigation("/login")
        }
      }
    }
  }

  useEffect(() => {
    directoryData()
  }, [])

  return component
}