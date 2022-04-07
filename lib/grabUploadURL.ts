export async function GrabUploadUrl( filename: string ) {
    const res = await fetch('/api/upload-image',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            filename
        }),
        redirect: 'follow'
    });
    return res;
};