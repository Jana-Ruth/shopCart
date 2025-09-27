import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'


interface ButtonProps{
  title:string;
  onPress:() => void;
  variant?:"primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

const Button:React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle= [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style
  ];

  const textStyles=[styles.text, styles[`${variant}Text`], textStyle];
  return (
    <TouchableOpacity 
    style={buttonStyle} 
    onPress={onPress} 
    disabled={disabled || loading} 
    activeOpacity={0.7}
    >
    {loading ? (
      <ActivityIndicator color={variant==="primary" ? "white" : "#a9a9a9"} />
    ) : (
        <Text style={textStyles}>{title}</Text>
    )
    }
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
 
  },

  text: { 
    fontWeight: "600"
  },

fullWidth: {
width: "100%",
},

disabled: {
opacity: 0.5,
},

  primary: {
  backgroundColor: "#1e90ff"
  },

secondary: {
backgroundColor: "",
},

outline: {
backgroundColor: "transparent",
borderWidth: 1,
borderColor: "#1e90ff"
},

ghost: {
backgroundColor: "transparent",
},

// Text styles for variants

  primaryText: {
   color: "white"
  },
  secondaryText: {
    color: "white",
  },

  outlineText: {
    color: "#1e90ff",
  },

  ghostText: {
    color: "#1e90ff"
  
    // #a9a9a9
  },

  small: {
    paddingVertical: 8,
    paddingHorizontal:16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
large: {
  paddingVertical: 16,
  paddingHorizontal: 32,
},
});