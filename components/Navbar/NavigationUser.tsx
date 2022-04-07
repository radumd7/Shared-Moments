import Image from "next/image";
interface userProps {
    user:{
        name: string,
        image: string,
        email: string
    }
}
export default function NavigationUser( props: userProps ) {
    const { name, image } = props.user
    return(
        <div className="w-full flex flex-col items-center justify-center py-4">
            <div className="relative w-[100px] aspect-square mb-2">
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-full"
                />
            </div>
            <p className="text-2xl font-medium">Hey, <span className="text-blue-500 dark:text-blue-300">{name.split(' ')[0]}</span>!</p>
            <p>{`Don't forget to share something nice today!`}</p>
        </div>
    );
};