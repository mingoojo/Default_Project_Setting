"use client"

import { NextPage } from "next";



const privateRouter = (Component : NextPage | React.FC) => {


  return Component;
};

export default privateRouter;