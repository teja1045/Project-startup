import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        activeOpacity={0.8}
        style={[styles.button, style]}>
        <LinearGradient
          colors={['rgba(99, 102, 241, 0.9)', 'rgba(139, 92, 246, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryGradient}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.primaryText, textStyle]}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      style={[styles.button, styles.outlineButton, style]}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.outlineText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GlassButton;