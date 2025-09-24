import { Billboard as BillboardType } from '@/types';
import Image from 'next/image';

interface BillboardProps {
    data: BillboardType
};

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    // Debug logging
    console.log('Billboard data:', data);
    
    if (!data?.imageUrl) {
        console.log('No imageUrl found in billboard data');
        return (
            <div className='p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl'>
                <div className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300'>
                    <div className='flex flex-col items-center justify-center w-full h-full text-center gap-y-8'>
                        <div className='max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl text-gray-600'>
                            {data?.label || 'No Image Available'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl'>
            <div className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden'>
                <Image
                    src={data.imageUrl}
                    alt={data.label || 'Billboard'}
                    fill
                    className='object-cover'
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className='absolute inset-0 bg-black bg-opacity-20'></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center w-full h-full text-center gap-y-8'>
                    <div className='max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl text-white drop-shadow-lg'>
                        {data.label}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billboard;