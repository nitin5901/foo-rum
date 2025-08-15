export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - dateObj.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffSeconds = Math.floor(diffTime / 1000);
    
    if (diffMinutes === 0 && diffSeconds === 0) {
        return 'Just Now';
    } else if (diffMinutes === 0) {
        return `${diffSeconds} seconds ago`;
    } else if (diffHours === 0) {
        return `${diffMinutes} minutes ago`;
    } else if (diffDays === 0) {
        return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else {
        return `${diffDays} days ago`;
    }
}