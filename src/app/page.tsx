import { AreaImage } from "@/components/area-image";
import { SelectImageProvider } from "@/contexts/context-image";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"edit-image",
    description:"edit image"
}

export default function Home() {
    return (
        <SelectImageProvider>
            <div className="w-screen h-screen overflow-hidden">
                <AreaImage />
            </div>
        </SelectImageProvider>
    );
}
