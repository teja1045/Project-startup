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
import { quotesAPI } from '../services/api';

const QuoteScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    description: '',
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.service || !formData.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await quotesAPI.create(formData);
      Alert.alert('Success', 'Quote request submitted successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit quote request');
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
            Request a <Text style={styles.gradientText}>Quote</Text>
          </Text>
          <Text style={styles.subtitle}>
            Tell us about your project and we'll get back to you within 24 hours
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
              label="Company"
              value={formData.company}
              onChangeText={(text) => setFormData({ ...formData, company: text })}
              placeholder="Your company name"
            />

            <GlassInput
              label="Service *"
              value={formData.service}
              onChangeText={(text) => setFormData({ ...formData, service: text })}
              placeholder="Development / Deployment / QA"
            />

            <GlassInput
              label="Budget Range"
              value={formData.budget}
              onChangeText={(text) => setFormData({ ...formData, budget: text })}
              placeholder="e.g., $5,000 - $10,000"
            />

            <GlassInput
              label="Project Description *"
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Tell us about your project, timeline, and requirements..."
              multiline
              numberOfLines={6}
              style={{ height: 120, textAlignVertical: 'top' }}
            />

            <GlassButton
              title={loading ? 'Submitting...' : 'Submit Request'}
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

export default QuoteScreen;