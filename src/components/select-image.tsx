"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSelectImage } from "@/contexts/context-image";

export const SelectImage = () => {

    const refImage = useRef(null);
    const [image, setImage] = useState<File | any>("");
    const selectImage = useSelectImage();

    const handleSelectImage = (evt:ChangeEvent<HTMLInputElement>)=>{
        if(evt.target.files){
            const urlImage = URL.createObjectURL(evt.target.files[0]);
            setImage(urlImage);
        }
    }

    const handleStart = ()=>{
        return selectImage?.setSelectImage(image);
    }

    return (
        <div className=" w-full p-3">
            <div className="my-2 text-center">
                <h1 className="text-2xl font-bold max-sm:text-lg my-1">Selecione uma Imagem para continuar</h1>
                <div className="relative overflow-hidden inline-block">
                    <Button variant={"outline"}>Selecionar imagem</Button>
                    <input 
                        type="file" 
                        className="absolute left-0 top-0 opacity-0" 
                        accept="image/*"
                        onChange={evt => handleSelectImage(evt)}
                    />
                </div>
            </div>
            {image == "" &&
                <Alert>
                    <AlertCircle className="h-5 w-5"/>
                    <AlertTitle>Nenhuma imagem selecionada</AlertTitle>
                    <AlertDescription>Clique no botão para selecionar</AlertDescription>
                </Alert>
            }
            <img ref={refImage} src={image} alt="" className=" w-[700px] m-auto rounded-md"/>
            {image !== "" && 
                <div className="my-3 w-full flex justify-center ">
                    <Button onClick={handleStart} variant={"outline"}>start</Button>
                </div>
                
            }
        </div>
    );
}