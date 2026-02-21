import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../navigation/RootNavigator';
import GlassCard from '../components/GlassCard';
import GlassInput from '../components/GlassInput';
import GlassButton from '../components/GlassButton';
import { authAPI } from '../services/api';

type AdminLoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminLogin'>;

const AdminLoginScreen = () => {
  const navigation = useNavigation<AdminLoginNavigationProp>();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password) {
      Alert.alert('Error', 'Please enter password');
      return;
    }

    setLoading(true);
    try {
      await authAPI.login(password);
      navigation.replace('AdminDashboard');
    } catch (error) {
      Alert.alert('Error', 'Invalid password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.15)', 'rgba(139, 92, 246, 0.08)', 'transparent']}
        style={styles.backgroundGradient}
      />
      
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🔒</Text>
          </View>
        </View>

        <GlassCard style={styles.card}>
          <Text style={styles.title}>
            Admin <Text style={styles.gradientText}>Login</Text>
          </Text>
          <Text style={styles.subtitle}>
            Enter password to access the admin dashboard
          </Text>

          <View style={styles.form}>
            <GlassInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter admin password"
              secureTextEntry
              autoCapitalize="none"
            />

            <GlassButton
              title={loading ? 'Logging in...' : 'Login'}
              onPress={handleLogin}
              loading={loading}
            />
          </View>

          <GlassCard style={styles.infoCard}>
            <Text style={styles.infoText}>Default password: admin123</Text>
            <Text style={styles.infoSubtext}>Change this in your backend .env file</Text>
          </GlassCard>
        </GlassCard>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  backText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 40,
  },
  card: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  gradientText: {
    color: '#8b5cf6',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  infoCard: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  infoText: {
    color: '#a5b4fc',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  infoSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default AdminLoginScreen;