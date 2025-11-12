import { 
  KeyboardTypeOptions, 
  StyleProp, 
  StyleSheet, 
  Text, 
  TextStyle, 
  View, 
  ViewStyle,
  TextInput as RNTextInput 
} from 'react-native'
import React from 'react'

interface TextInputProps{
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>

}


const TextInput:React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  labelStyle
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <RNTextInput 
      value={value}  
      onChangeText={onChangeText} 
      placeholder={placeholder}
       placeholderTextColor="rgb(181, 180, 180)"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCorrect={autoCorrect}
      multiline={multiline}
      style={[
        styles.input,
        inputStyle,
        multiline && styles.multilineInput,
        error && styles.inputError
        
      ]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
  container: {
   marginBottom: 16,
   width: "100%"
  },
  label: {
   marginBottom: 8,
   fontSize: 14,
   fontWeight: "500",
   color: "rgb(33, 33, 33)"
  },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#dcd9d9ff",
        color: "rgb(82, 81, 81)",
        
        
    },
    multilineInput: {
     minHeight: 100,
     textAlignVertical: "top",
    },
    inputError: {
        borderColor: "#ff0000",
    },
    errorText: {
        color: "#ff0000",
        fontSize: 12,
        marginTop: 4
    }
})