import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { Download, SaveIcon } from "lucide-react";

type Props = {
    onclick:()=>void;
    selctNewImage:()=>void;
    saveImage:()=>void;
}

export const ImageInfo = ({onclick,selctNewImage,saveImage}:Props)=>{
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={"outline"}>Opcões</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2" onClick={selctNewImage}>
                   <FaArrowLeft size={15}/> Selecionar outra imagem 
                </DropdownMenuItem>
                <DropdownMenuItem onClick={saveImage}>
                    <SaveIcon className="w-4 h-4 mr-2"/> Salvar imagem
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2" onClick={onclick}>
                    <Download className="w-4 h-4"/> Baixar imagem
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}