import Image from 'next/image';
import { BiUserCircle } from 'react-icons/bi';

interface props {
    user: {
        name: string,
        image: string,
    },
    image: string,
    title: string,
    anonymus: boolean,
    dateCreated: number
}

export default function PreviewCard(props: props) {
    const { user, image, title, anonymus, dateCreated } = props;
    return(
        <div className="w-full rounded-lg border border-gray-200 dark:border-neutral-600 p-4 mx-auto">
            <div className="w-full flex flex-row items-center justify-start pb-4">
                <div className="w-10 aspect-square relative mr-4">
                    {anonymus  ?
                        <BiUserCircle className='w-full h-full'/>
                    :
                        <Image src={user.image} alt={''} layout="fill" objectFit="cover" className="rounded-full"/>
                    }
                </div>
                <div className="flex flex-col">
                    { anonymus ? <p className="font-medium">Private user</p> : <p className="font-medium">{user.name}</p> }
                    { dateCreated && <p className="text-xs">{new Date(dateCreated).toISOString().split('T')[0]}</p> }
                </div>
            </div>
            <div className="relative w-full aspect-square">
            <Image
                src={image}
                alt={title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality="85"
                className="rounded-lg"
            />
            </div>
            <div className="py-4">
            <p className="text-sm text-blue-500 dark:text-blue-300 tracking-wide font-medium">{title}</p>
            </div>
        </div>
    );
};