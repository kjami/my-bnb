"use client";

import Image from "next/image";
import { Gallery, Item } from 'react-photoswipe-gallery'

const PropertyImage = ({ images }) => {
    return (
        <Gallery>
            <section className="bg-blue-50 p-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className={images.length%2 !== 0 && index === images.length-1 ? "col-span-2" : "col-span-1"}>
                        <Item
                          original={image}
                          thumbnail={image}
                          width="1000"
                          height="700"
                        >
                          {({ ref, open }) => (
                            <Image
                                ref={ref}
                                onClick={open}
                                src={image}
                                alt="image"
                                className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                                width={1800}
                                height={400}
                                priority={true}
                            />
                          )}
                        </Item>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </Gallery>
    )
};

export default PropertyImage;