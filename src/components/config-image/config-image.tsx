import { ReactNode } from "react";

export const ConfigImage = ({children}:{children:ReactNode})=>{
    return(
        <div className="w-[300px] border rounded-md bg-zinc-900">
            {children}
        </div>
    );
}

export const ConfigImageHeader = ({children}:{children:ReactNode})=>{
    return(
        <div className="p-3 flex justify-center items-center flex-col font-bold">
            {children}
        </div>
    );
}

export const ConfigImageAction = ({children}:{children:ReactNode})=>{
    return(
        <div className="flex flex-col justify-center text-center p-3 w-full">
            {children}
        </div>
    );
}