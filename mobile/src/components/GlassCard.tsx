import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
        style={styles.gradient}>
        <View style={styles.content}>{children}</View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default GlassCard;