import Image from 'next/image';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils' 
import { Image as ImageType } from '@/types';

interface GalleryTabProps {
    image: ImageType
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
    return ( 
        <Tab className="relative flex items-center justify-center bg-white dark:bg-slate-800 rounded-md cursor-pointer aspect-square">
            {({ selected }) => (
                <div>
                    <span className='absolute inset-0 w-full h-full overflow-hidden rounded-md aspect-square'>
                        <Image fill alt="" src={image.url} className='object-cover object-center' />
                    </span>
                    <span className={cn("absolute inset-0 rounded-md ring-2 ring-offset-2", selected ? "ring-black dark:ring-white" : 'ring-transparent')} />
                </div>
            )}
        </Tab>
     );
}
 
export default GalleryTab;