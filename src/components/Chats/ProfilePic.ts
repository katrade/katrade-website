export default function ProfilePic(uid: string) {

    return (
        `https://firebasestorage.googleapis.com/v0/b/letskatrade.appspot.com/o/profile%2F${uid}?alt=media`
    )
}
