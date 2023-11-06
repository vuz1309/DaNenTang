import { useAppToken } from "../../hooks/useAppToken"

export const NotificationProvider = (props: any) => {
    const {getFcmToken, saveFCMToken} = useAppToken();
    
}   