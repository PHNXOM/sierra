import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

export default function AlertDialog({
  visible,
  onDismiss,
  title,
  content,
  buttons = [],
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          {buttons.length == 0 ? (
            <Button onPress={onDismiss}>OK</Button>
          ) : (
            buttons.map((button, index) => (
              <Button
                onPress={() => {
                  button.onPress();
                  onDismiss();
                }}
                key={index}
              >
                {button.title}
              </Button>
            ))
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
