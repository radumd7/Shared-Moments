const deleteMoment = async ({ _id, filename }) => {
    await fetch('/api/delete-moment',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            _id, filename
        })
    });
};
export default deleteMoment;