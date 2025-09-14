"use client"
import { useEffect, useState } from "react";

export type Device = "mobile" | "tablet" | "desktop" | "default"

type Demension = {
  width: number;
  height: number;
}

type WebSize = "XXL" | "XL" | "L" | "M" | "MS" | "S" | "SS" | "default"


/*
*DESC:
  화면너비에 따라 반응형으로 값을 내보냄
*RETURN:
  device: 화면크리에 따라 맞는 기기명을 표출,
  width: 화면의 너비값 표출,
  height: 화면의 높이값 표출,
  webSize: 화면크기에 따라 XXL~SS까지의 값을 표출,
>TODO(24-11-28기준):
*/
export default function useMediaQuary() {
  const [device, setDevice] = useState<Device>("default")
  const [dimensions, setDimensions] = useState<Demension>({
    width: 0,
    height: 0,
  })
  const [webSize, setWebSize] = useState<WebSize>("default")

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setDevice("mobile")
      } else if (window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches) {
        setDevice("tablet")
      } else {
        setDevice("desktop")
      }
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    checkDevice()

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };

  }, [])

  useEffect(() => {
    const checkWebSize = () => {
      if (dimensions !== null) {
        if (dimensions.width >= 1600) {
          setWebSize("XXL")
        } else if (dimensions.width >= 1200 && dimensions.width < 1600) {
          setWebSize("XL")
        } else if (dimensions.width >= 960 && dimensions.width < 1200) {
          setWebSize("L")
        } else if (dimensions.width >= 720 && dimensions.width < 960) {
          setWebSize("M")
        } else if (dimensions.width >= 560 && dimensions.width < 720) {
          setWebSize("MS")
        } else if (dimensions.width >= 400 && dimensions.width < 560) {
          setWebSize("S")
        } else {
          setWebSize("SS")
        }
      }
    }

    checkWebSize()

    return () => {
      checkWebSize()
    }

  }, [dimensions])

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    webSize,
  }
}