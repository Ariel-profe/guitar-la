
export const formatDate = (date:string) => {

    const newDate = new Date(date);

    const opts:Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };

    return newDate.toLocaleDateString('en-US', opts)

};
