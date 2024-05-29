import { DropletIcon } from "lucide-react"
import { BiColor } from "react-icons/bi";

export const Coloroptions = ()=>{
    return( 
        <div className="w-full gap-3">
            <div className="relative overflow-hidden inline-block">
                <button className="flex p-1 border rounded-md text-center">
                    <BiColor className="mr-2" size={22}/>Todas as cores
                </button>
            </div>
        </div>
    );
}