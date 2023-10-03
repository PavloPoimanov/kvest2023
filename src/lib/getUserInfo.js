export const getUserInfo = (users) => {
    if (!users){
        return []
    }
    const entries = Object.entries(users);
    return entries[entries.length - 1];
}
