"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Context = {
    selectImage:string;
    setSelectImage: (selectImage:string)=>void;
}

export const ContextSelectImage = createContext<null | Context>(null);

export const SelectImageProvider = ({ children }:{ children: ReactNode })=>{

    const [selectImage,setSelectImage] = useState("");

    return(
        <ContextSelectImage.Provider value={{selectImage,setSelectImage}}>
            {children}
        </ContextSelectImage.Provider>
    );
}

export const useSelectImage = ()=> useContext(ContextSelectImage);