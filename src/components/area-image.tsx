"use client";

import { SelectImage } from "@/components/select-image";
import { useSelectImage } from "@/contexts/context-image";
import { ImageEdit } from "@/components/image-edi";

export const AreaImage = ()=>{

    const selectImage = useSelectImage();

    return(
        <div className="border w-[80%] h-full p-3 m-auto max-lg:w-full overflow-hidden">
            {!selectImage?.selectImage && 
                <SelectImage/>
            }
            {selectImage?.selectImage && 
                <ImageEdit/>
            }
        </div>
    );
}