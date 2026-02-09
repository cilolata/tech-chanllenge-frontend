import { Alert } from "@chakra-ui/react/alert"

type StatusType = "info" | "warning" | "success" | "error" | "neutral"

export const AlertComponent = ({title, statusType}: {title: string, statusType: StatusType}) => {
    return (
        <Alert.Root status={statusType}>
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>{title}</Alert.Title>
                <Alert.Description />
            </Alert.Content>
        </Alert.Root>
    )
}
