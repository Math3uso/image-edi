"use client";

import { useSelectImage } from "@/contexts/context-image";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Contrast, Lightbulb } from "lucide-react";
import { CiBrightnessDown } from "react-icons/ci";
import { ImageInfo } from "@/components/image-info";
import { ConfigImage, ConfigImageAction, ConfigImageHeader } from "@/components/config-image/config-image";
import { MdGradient, MdInvertColors } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const ImageEdit = () => {

    const selectImage = useSelectImage();
    const refCanvas = useRef<HTMLCanvasElement>(null);
    const [sizeCanvas, setSizeCanvas] = useState({
        width: 0,
        height: 0,
    });
    const [contextCanvas, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const [defaultCanvas, setDefaultCanvas] = useState<HTMLCanvasElement>();
    const [sizeImage, setSizeImage] = useState({
        width: 0,
        height: 0,
    });
    const [imageVerif, setImageVerif] = useState(false);
    const { toast } = useToast();

    const [contraste, setContraste] = useState(1);
    const [brilho, setBrilho] = useState(1);
    const [saturate, setSaturate] = useState(1);
    const [invert, setInvert] = useState(0);
    const [sepia, setSepia] = useState(0);

    useEffect(() => {
        const canvas = refCanvas.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");

        setContext(canvas.getContext("2d"));
        const img = new Image();
        if (!selectImage?.selectImage) return;
        img.onload = () => {

            setSizeImage({
                width: img.width,
                height: img.height,
            });

            const maxWidth = window.innerWidth > 1300 ? 1000 : 500;
            const maxHeight = window.innerHeight > 900 ? 600 : 320;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                height *= maxWidth / width;
                width = maxWidth
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }
            setSizeCanvas({
                width,
                height,
            });

            canvas.width = width;
            canvas.height = height;
            if (!context) return;
            context.drawImage(img, 0, 0, width, height);
        }

        img.src = selectImage?.selectImage;
    }, []);

    const verifImage = () => {
        setImageVerif(false);
        const canvas = refCanvas.current;

        if (!contextCanvas) return
        const img = new Image();
        if (!selectImage?.selectImage) return;
        img.onload = () => {
            contextCanvas.drawImage(img, 0, 0, sizeCanvas.width, sizeCanvas.height);
            contextCanvas.filter = `blur(0px) contrast(${contraste}) brightness(${brilho}) saturate(${saturate}) invert(${invert}) sepia(${sepia})`;
        }
        img.src = selectImage?.selectImage;
    }

    const handleDowloadImage = () => {

        // const canvas = refCanvas.current;
        // if(!canvas)return;
        // const image = canvas.toDataURL("image/png");
        // const link = document.createElement("a");
        // link.href = image;
        // link.download = "image.png";
        // link.click();

        const canvas = defaultCanvas;
        const context = canvas?.getContext("2d");
        if (!canvas) return alert("erro imagem possivelmente indefinida");
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "my-midified-image.png";
        link.click();
        document.body.removeChild(defaultCanvas);
    }

    const handleSelectImage = () => {
        setImageVerif(true);
        setBrilho(1);
        setContraste(1);
        setSaturate(1);
        setSepia(1);
        setInvert(0);
        selectImage?.setSelectImage("");
    }

    const handleSaveImage = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return;
        canvas.width = sizeImage.width;
        canvas.height = sizeImage.height;
        const img = new Image();

        img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        if (!selectImage?.selectImage) return
        img.src = selectImage.selectImage;
        context.filter = `blur(0px) contrast(${contraste}) brightness(${brilho}) saturate(${saturate}) invert(${invert}) sepia(${sepia})`;
        setDefaultCanvas(canvas);
        toast({
            title: "Imagem salva",
            description: "imagem pode ser baixada a qualquer momento",
            action: (
                <ToastAction altText="fechar">Fechar</ToastAction>
            ),
        });

    }

    return (
        <div className="w-full">
            <header className="p-1 my-3">
                <ImageInfo onclick={handleDowloadImage} selctNewImage={handleSelectImage} saveImage={handleSaveImage} />
            </header>
            <div className="flex justify-center items-center">
                <canvas ref={refCanvas}></canvas>
            </div>


            <div className="p-3 my-2 flex justify-start items-center gap-5 w-full overflow-auto max-lg:gap-3 max-lg:mt-20">
                <ConfigImage>
                    <ConfigImageHeader>
                        <Contrast />
                        <p>Contraste</p>
                    </ConfigImageHeader>
                    <Separator />
                    <ConfigImageAction>
                        <p className="text-lg font-bold">{contraste}</p>
                        <input type="range" onChange={evt => {
                            setContraste(parseInt(evt.target.value) / 10);
                            verifImage();
                        }}
                            defaultValue={1}
                            minLength={-10}
                        />
                    </ConfigImageAction>
                </ConfigImage>

                <ConfigImage>
                    <ConfigImageHeader>
                        <CiBrightnessDown size={35} />
                        <p>Brilho</p>
                    </ConfigImageHeader>
                    <Separator />
                    <ConfigImageAction>
                        <p>{brilho}</p>
                        <input type="range" onChange={evt => {
                            setBrilho(parseInt(evt.target.value) / 10);
                            verifImage();
                        }}
                            defaultValue={1}
                        />
                    </ConfigImageAction>
                </ConfigImage>

                <ConfigImage>
                    <ConfigImageHeader>
                        <MdInvertColors size={30} />
                        <p>Inverter</p>
                    </ConfigImageHeader>
                    <Separator />
                    <ConfigImageAction>
                        <input type="checkbox" className="size-5 m-auto"
                            onClick={evt => {
                                setInvert(evt.currentTarget.checked ? 1 : 0);
                                verifImage();
                            }}
                        />
                    </ConfigImageAction>
                </ConfigImage>

                <ConfigImage>
                    <ConfigImageHeader>
                        <MdInvertColors size={30} />
                        <p>Sepia</p>
                    </ConfigImageHeader>
                    <Separator />
                    <ConfigImageAction>
                        <p>{sepia}</p>
                        <input type="range"
                            onChange={evt => {
                                setSepia(parseInt(evt.target.value) / 10);
                                verifImage();
                            }}
                            max={10}
                        />
                    </ConfigImageAction>
                </ConfigImage>

                <ConfigImage>
                    <ConfigImageHeader>
                        <MdGradient size={27} />
                        <p>Saturação</p>
                    </ConfigImageHeader>
                    <Separator/>
                    <ConfigImageAction>
                        <p className="text-lg font-bold">{saturate}</p>
                        <input type="range" onChange={evt => {
                            setSaturate(parseInt(evt.target.value) / 10);
                            verifImage();
                        }}
                            defaultValue={1}
                        />
                    </ConfigImageAction>
                </ConfigImage>
            </div>

        </div>
    );
}