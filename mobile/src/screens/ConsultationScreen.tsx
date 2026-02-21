import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlassCard from '../components/GlassCard';
import GlassInput from '../components/GlassInput';
import GlassButton from '../components/GlassButton';
import { consultationsAPI } from '../services/api';

const ConsultationScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    topic: '',
    message: '',
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.preferred_date || !formData.preferred_time || !formData.topic) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await consultationsAPI.create(formData);
      Alert.alert('Success', 'Consultation booked successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to book consultation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back to Home</Text>
        </TouchableOpacity>

        <GlassCard style={styles.card}>
          <Text style={styles.title}>
            Book a <Text style={styles.gradientText}>Consultation</Text>
          </Text>
          <Text style={styles.subtitle}>
            Schedule a free 30-minute consultation with our experts
          </Text>

          <View style={styles.form}>
            <GlassInput
              label="Name *"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Your full name"
            />

            <GlassInput
              label="Email *"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <GlassInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="+1 (555) 000-0000"
              keyboardType="phone-pad"
            />

            <GlassInput
              label="Preferred Date *"
              value={formData.preferred_date}
              onChangeText={(text) => setFormData({ ...formData, preferred_date: text })}
              placeholder="YYYY-MM-DD"
            />

            <GlassInput
              label="Preferred Time *"
              value={formData.preferred_time}
              onChangeText={(text) => setFormData({ ...formData, preferred_time: text })}
              placeholder="e.g., 09:00 AM"
            />

            <GlassInput
              label="Discussion Topic *"
              value={formData.topic}
              onChangeText={(text) => setFormData({ ...formData, topic: text })}
              placeholder="Development / Deployment / QA / General"
            />

            <GlassInput
              label="Additional Notes"
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
              placeholder="Any specific topics or questions you'd like to discuss..."
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: 'top' }}
            />

            <GlassButton
              title={loading ? 'Booking...' : 'Book Consultation'}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </GlassCard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  card: {
    marginBottom: 20,
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
  },
  form: {
    gap: 4,
  },
});

export default ConsultationScreen;