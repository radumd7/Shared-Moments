import { FC } from "react";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";

export interface CardProps {
    moment: {
        image: string,
        title: string,
        dateCreated: number,
        uploadedBy: {
            name: string,
            avatar: string,
            email: string,
        },
        anonymus: boolean
    }
};

const Card: FC<CardProps> = ( props ) => {
    const { moment } = props;
    return(
        <div className="w-full rounded-lg border border-gray-200 dark:border-neutral-600 p-4">
            <div className="w-full flex flex-row items-center justify-start pb-4">
                <div className="w-10 aspect-square relative mr-4">
                    {moment.anonymus === false ?
                    <Image src={moment.uploadedBy.avatar!} alt={''} layout="fill" objectFit="cover" className="rounded-full"/>
                    :
                    <BiUserCircle className='w-full h-full'/>
                    }
                </div>
                <div className="flex flex-col">
                    { moment.anonymus ? <p className="font-medium">Private user</p> : <p className="font-medium">{moment.uploadedBy.name}</p> }
                    { moment.dateCreated && <p className="text-xs">{new Date(moment.dateCreated).toISOString().split('T')[0]}</p> }
                </div>
            </div>
            <div className="relative w-full aspect-square">
            <Image
                src={moment.image}
                alt={moment.title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality="85"
                className="rounded-lg"
            />
            </div>
            <div className="py-4">
            <p className="text-sm text-blue-500 dark:text-blue-300 tracking-wide font-medium">{moment.title}</p>
            </div>
        </div>
    );
};
export default Card;