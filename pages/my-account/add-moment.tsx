import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import PreviewCard from "../../components/UI/PreviewCard";
import { GrabUploadUrl } from '../../lib/grabUploadURL';
export default function AddMoment() {
    const { data: session } = useSession();
    const defaultMoment = {
    user: session?.user,
        filename: '',
        title: '',
        anonymus: false
    }
    const router = useRouter();
    const [ uploading, setUploading ] = useState(false);
    const [ imageUploaded, setImageUploaded ] = useState(false);
    const [ moment, setMoment ] = useState(defaultMoment);

    useEffect(() => {
        if(!session){
            router.push('/auth/signin');
        }else{
            setMoment({...moment, user: session.user})
        }
    },[]);

    const uploadImage = async (e: any) => {
        const file = e.target.files[0];
        const filename = encodeURIComponent(file.name);
        const res = await GrabUploadUrl(filename);
        const { url, fields } = await res.json();
        const formData = new FormData();
        
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as any);
        });

        const upload = await fetch(url, {
            method: 'POST',
            body: formData
        })

        if(upload.ok){
            setImageUploaded(true);
            setMoment({...moment, filename});
        }
    };
    const uploadMoment = async (e: any) => {
        setUploading(true);
        e.preventDefault();
        if(moment.title !== '' && moment.filename !== ''){
            const res = await fetch('/api/create-moment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(moment)
            });
            if(res.ok){
                const inputs = document.querySelectorAll('#moment_image, #moment_title');
                inputs.forEach(input => {
                    //@ts-ignore
                    input.value = '';
                });
            };
            setUploading(false);
            setMoment(defaultMoment);
        };
    };
    return(
        <React.Fragment>
            <Head>
                <title>Create moment | Shared Moments</title>
                <meta name="description" content="You can create beautiful moments and share them with your friends."/>
            </Head>
            <div className="container mx-auto">
                <form
                    onSubmit={uploadMoment}
                    className="flex flex-col w-fit mx-auto p-4"
                >
                    <PreviewCard
                        user={{
                            name: session!.user!.name as string,
                            image: session!.user!.image as string
                        }}
                        image={moment.filename && imageUploaded ? `https://momentsapp.s3.eu-central-1.amazonaws.com/${moment.filename}` : '/upload_image.png'}
                        title={moment.title}
                        anonymus={moment.anonymus}
                        dateCreated={Date.now()}
                    />
                    <input
                        id="moment_image"
                        onChange={uploadImage}
                        type="file"
                        accept="image/png, image/jpeg"
                        required
                        className="my-4"
                    />
                    <input
                        id="moment_title"
                        onChange={(e)=>setMoment({...moment, title: e.target.value})}
                        type="text"
                        required
                        placeholder="Moment title"
                        className="mb-4"
                    />
                    <div className="flex flex-row items-center justify-start mb-4">
                        <div className="mr-2">
                            <input
                                checked={moment.anonymus}
                                id="moment_privacy"
                                type="checkbox"
                                className="w-4 h-4"
                                onChange={(e)=>setMoment({...moment, anonymus: !moment.anonymus})}
                            />
                        </div>
                        <div>
                            <label htmlFor="moment_privary">{`Hide my name and profile picture.`}</label>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button type="submit" size="small">
                            <div className="flex flex-row items-center justify-start">
                                {uploading ? 
                                    <svg role="status" className="inline mr-2 w-3 h-3 text-white animate-spin dark:text-blue-900 fill-blue-500 dark:fill-blue-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                :null}
                                <p>Submit</p>
                            </div>
                        </Button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};
AddMoment.auth = true;